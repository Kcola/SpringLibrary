package com.teal.library.springsecurityjwt;

import com.teal.library.springsecurityjwt.models.BorrowsEntity;
import com.teal.library.springsecurityjwt.models.ReaderEntity;
import com.teal.library.springsecurityjwt.models.ReservesEntity;
import com.teal.library.springsecurityjwt.models.UsersEntity;
import com.teal.library.springsecurityjwt.viewmodels.*;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class DataAccess {

    public int AddUser(UsersEntity userModel, int readerid) {
        try {
            Session session = HibernateORM.getSessionFactory().openSession();
            session.beginTransaction();
            userModel.setReaderid(readerid);
            session.save(userModel);
            session.getTransaction().commit();
            session.close();
            return 1;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return -1;
        }
    }

    public int AddReader(UserForm user) {
        try {
            ReaderEntity newReaderModel = new ReaderEntity();
            newReaderModel.setFirstname(user.getFirstname());
            newReaderModel.setLastname(user.getLastname());
            newReaderModel.setAddress(user.getAddress());
            newReaderModel.setEmail(user.getEmail());
            newReaderModel.setRtype(user.getType());
            newReaderModel.setZipcode(user.getZipcode());
            Session session = HibernateORM.getSessionFactory().openSession();
            session.beginTransaction();
            session.save(newReaderModel);
            session.getTransaction().commit();
            session.close();
            return newReaderModel.getReaderid();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return -1;
        }
    }

    public boolean ExistsUser(String username) {
        Session session = HibernateORM.getSessionFactory().openSession();
        Query query = session.createQuery("from UsersEntity where username = :username");
        query.setParameter("username", username);
        List<UsersEntity> list = query.list();
        session.close();
        if (list.size() == 0)
            return false;
        else
            return true;
    }

    public UsersEntity ValidateUser(String username) {
        Session session = HibernateORM.getSessionFactory().openSession();
        Query query = session.createQuery("from UsersEntity where username = :username");
        query.setParameter("username", username);
        List<UsersEntity> list = query.list();
        UsersEntity userModel = list.get(0);
        session.close();
        return userModel;
    }

    public ReaderEntity GetUserInfo(String username) {
        Session session = HibernateORM.getSessionFactory().openSession();
        Query query = session.createQuery("select reader.readerid, reader.address, reader.email, reader.rtype, reader.zipcode, reader.firstname, reader.lastname from ReaderEntity reader," +
                "UsersEntity user where user.readerid = reader.readerid and user.username = :username");
        query.setParameter("username", username);
        List<Object[]> list = query.list();
        Object[] prop = list.get(0);
        ReaderEntity reader = new ReaderEntity();
        reader.setReaderid((Integer) prop[0]);
        reader.setAddress(prop[1].toString());
        reader.setEmail(prop[2].toString());
        reader.setRtype(prop[3].toString());
        reader.setZipcode(prop[4].toString());
        reader.setFirstname(prop[5].toString());
        reader.setLastname(prop[6].toString());
        session.close();
        return reader;
    }

    public List<BookGrid> GetBooks() {
        Session session = HibernateORM.getSessionFactory().openSession();
        Query query = session.createQuery("select distinct doc.docid, doc.title, doc.pdate, pub.pubname, book.isbn, book.genre from BookEntity book," +
                "DocumentEntity doc, CopyEntity copy, PublisherEntity pub where doc.docid = book.docid and doc.publisherid = pub.publisherid and copy.docid = book.docid");
        List<Object[]> list = query.list();
        session.close();
        List<BookGrid> books = new ArrayList<BookGrid>();
        for (Object row[] : list) {
            BookGrid entry = new BookGrid((Integer) row[0], row[1].toString(), row[2].toString(), row[3].toString(), row[4].toString(), row[5].toString());
            books.add(entry);
        }
        return books;
    }

    public int BorrowBook(BorrowForm info) {
        Session session = HibernateORM.getSessionFactory().openSession();
        Query query = session.createQuery("select docs.docid, copy.copyid, copy.libid, copy.position  from CopyEntity copy, DocumentEntity docs, BookEntity books where copy.docid = docs.docid and docs.docid = books.docid and books.isbn = :isbn");
        query.setParameter("isbn", info.getIsbn());
        List<Object[]> list = query.list();
        Object[] prop = list.get(0);
        Date today = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(today);
        BorrowsEntity borrow = new BorrowsEntity();
        borrow.setBtime(new java.sql.Date(today.getTime()));
        borrow.setCopyid(prop[1].toString());
        borrow.setDocid((Integer) prop[0]);
        borrow.setFines(0);
        borrow.setRtime(null);
        borrow.setReaderid(info.getReaderid());
        switch (info.getDuration()) {
            case "14d":
                c.add(Calendar.DATE, 14);
                borrow.setDuedate(new java.sql.Date(c.getTime().getTime()));
                break;
            case "1m":
                c.add(Calendar.MONTH, 1);
                borrow.setDuedate(new java.sql.Date(c.getTime().getTime()));
                break;
            case "2m":
                c.add(Calendar.MONTH, 2);
                borrow.setDuedate(new java.sql.Date(c.getTime().getTime()));
        }
        borrow.setFines(0);
        borrow.setLibid((Integer) prop[2]);
        borrow.setPosition(prop[3].toString());
        session.beginTransaction();
        session.save(borrow);
        session.getTransaction().commit();
        session.close();
        return borrow.getBornumber();
    }

    public List<BorrowGrid> Borrowed(int readerID) {
        Session session = HibernateORM.getSessionFactory().openSession();
        Query query = session.createQuery("Select borrow.bornumber, docs.title, borrow.btime, borrow.rtime, borrow.fines, borrow.duedate from BorrowsEntity borrow, DocumentEntity docs where readerid = :readerID and docs.docid = borrow.docid and borrow.rtime=null");
        query.setParameter("readerID", readerID);
        List<Object[]> borrowed = query.list();
        List<BorrowGrid> borrowedGrid = new ArrayList<BorrowGrid>();
        for (Object[] entry : borrowed) {
            BorrowGrid data = new BorrowGrid();
            data.setBornumber((Integer) entry[0]);
            data.setTitle(entry[1].toString());
            data.setBtime((java.sql.Date) entry[2]);
            data.setRtime((java.sql.Date) entry[3]);
            data.setFines(0.0);
            data.setDuedate((java.sql.Date) entry[5]);
            borrowedGrid.add(data);
        }
        session.close();
        return borrowedGrid;
    }

    public int ReserveBook(BorrowForm info) {
        Session session = HibernateORM.getSessionFactory().openSession();
        Query query = session.createQuery("select docs.docid, copy.copyid, copy.libid, copy.position  from CopyEntity copy, DocumentEntity docs, BookEntity books where copy.docid = docs.docid and docs.docid = books.docid and books.isbn = :isbn");
        query.setParameter("isbn", info.getIsbn());
        List<Object[]> list = query.list();
        Object[] prop = list.get(0);
        Date today = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(today);
        ReservesEntity reserve = new ReservesEntity();
        reserve.setDtime(new java.sql.Date(today.getTime()));
        reserve.setCopyid(prop[1].toString());
        reserve.setDocid((Integer) prop[0]);
        reserve.setPtime(null);
        reserve.setReaderid(info.getReaderid());
        reserve.setLibid((Integer) prop[2]);
        reserve.setPosition(prop[3].toString());
        session.beginTransaction();
        session.save(reserve);
        session.getTransaction().commit();
        session.close();
        return reserve.getResnumber();
    }

    public List<ReserveGrid> Reserved(int readerID) {
        Session session = HibernateORM.getSessionFactory().openSession();
        Query query = session.createQuery("Select reserves.resnumber, docs.title, reserves.dtime from ReservesEntity reserves, DocumentEntity docs where readerid = :readerID and docs.docid = reserves.docid and reserves.ptime=null");
        query.setParameter("readerID", readerID);
        List<Object[]> borrowed = query.list();
        List<ReserveGrid> reserveGrid = new ArrayList<ReserveGrid>();
        for (Object[] entry : borrowed) {
            ReserveGrid data = new ReserveGrid();
            data.setResnumber((Integer) entry[0]);
            data.setTitle(entry[1].toString());
            data.setRtime((java.sql.Date) entry[2]);
            reserveGrid.add(data);
        }
        session.close();
        return reserveGrid;
    }

    public List<BorrowGrid> History(int readerID) {
        Session session = HibernateORM.getSessionFactory().openSession();
        Query query = session.createQuery("Select borrow.bornumber, docs.title, borrow.btime, borrow.rtime, borrow.fines, borrow.duedate from BorrowsEntity borrow, DocumentEntity docs where readerid = :readerID and docs.docid = borrow.docid");
        query.setParameter("readerID", readerID);
        List<Object[]> borrowed = query.list();
        List<BorrowGrid> borrowedGrid = new ArrayList<BorrowGrid>();
        for (Object[] entry : borrowed) {
            BorrowGrid data = new BorrowGrid();
            data.setBornumber((Integer) entry[0]);
            data.setTitle(entry[1].toString());
            data.setBtime((java.sql.Date) entry[2]);
            data.setRtime((java.sql.Date) entry[3]);
            data.setFines(0.0);
            data.setDuedate((java.sql.Date) entry[5]);
            borrowedGrid.add(data);
        }
        session.close();
        return borrowedGrid;
    }

    public int Return(int bornumber) {
        try {
            Session session = HibernateORM.getSessionFactory().openSession();
            Transaction tx = session.beginTransaction();
            BorrowsEntity transaction = session.load(BorrowsEntity.class, bornumber);
            Date today = new Date();
            Calendar c = Calendar.getInstance();
            c.setTime(today);
            transaction.setRtime(new java.sql.Date(c.getTime().getTime()));
            session.update(transaction);
            tx.commit();
            session.close();
            return 1;
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return -1;
        }
    }
}
