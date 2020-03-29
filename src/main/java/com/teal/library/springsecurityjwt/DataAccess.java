package com.teal.library.springsecurityjwt;
import com.teal.library.springsecurityjwt.viewmodels.UserForm;
import org.hibernate.Session;
import org.hibernate.query.*;
import com.teal.library.springsecurityjwt.models.*;

import java.util.List;

public class DataAccess {

    public int AddUser(UsersEntity userModel, int readerid){
        try{
            Session session = HibernateORM.getSessionFactory().openSession();
            session.beginTransaction();
            userModel.setReaderid(readerid);
            session.save(userModel);
            session.getTransaction().commit();
            return 1;
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return -1;
        }
    }
    public int AddReader(UserForm user){
        try{
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
            return newReaderModel.getReaderid();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return -1;
        }
    }
    public boolean ExistsUser(String username){
        Session session = HibernateORM.getSessionFactory().openSession();
        Query query = session.createQuery("from UsersEntity where username = :username");
        query.setParameter("username", username);
        List<UsersEntity> list = query.list();
        if(list.size() == 0)
            return false;
        else
            return true;
    }
    public UsersEntity ValidateUser(String username){
        Session session = HibernateORM.getSessionFactory().openSession();
        Query query = session.createQuery("from UsersEntity where username = :username");
        query.setParameter("username", username);
        List<UsersEntity> list = query.list();
        UsersEntity userModel = list.get(0);
        return userModel;
    }

    public ReaderEntity GetUserInfo(String username) {
        Session session = HibernateORM.getSessionFactory().openSession();
        Query query = session.createQuery("select reader.readerid, reader.address, reader.email, reader.rtype, reader.zipcode, reader.firstname, reader.lastname from ReaderEntity reader," +
                "UsersEntity user where user.readerid = reader.readerid and user.username = :username");
        query.setParameter("username", username);
        List<Object[]> list = query.list();
        Object[] prop  = list.get(0);
        ReaderEntity reader = new ReaderEntity();
        reader.setReaderid((Integer)prop[0]);
        reader.setAddress(prop[1].toString());
        reader.setEmail(prop[2].toString());
        reader.setRtype(prop[3].toString());
        reader.setZipcode(prop[4].toString());
        reader.setFirstname(prop[5].toString());
        reader.setLastname(prop[6].toString());
        return reader;
    }
}
