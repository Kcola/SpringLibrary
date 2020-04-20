package com.teal.library.springsecurityjwt;

import com.teal.library.springsecurityjwt.models.BorrowsEntity;
import com.teal.library.springsecurityjwt.models.UsersEntity;
import com.teal.library.springsecurityjwt.viewmodels.UserForm;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Random;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DataAccessTests {
    @Autowired
    private DataAccess db;

    @Test
    public void ExistsUserTest() {
        assertTrue(db.ExistsUser("kola") == true);
    } // UNIT TEST 6

    @Test
    public void ValidateUser() {
        assertTrue(db.ValidateUser("bot").getReaderid() == 8);
    }// UNIT TEST 7

    @Test
    public void GetAvailableCopies() {
        assertTrue(db.GetBooks().size() > 0);
    }//UNIT TEST 8

    @Test
    public void GetUserInfoTest() {
        assertTrue(db.GetUserInfo("bot").getFirstname().equals("Test"));
    }//UNIT TEST 9

    @Test
    public void ReturnBookTest() {
        Session session = HibernateORM.getSessionFactory().openSession();
        Query query = session.createQuery("from BorrowsEntity where readerid = 8 and rtime = null");
        List<BorrowsEntity> list = query.list();
        Random rand = new Random();
        int randomBook = list.get(rand.nextInt(list.size())).getBornumber();
        assertEquals(1, db.Return(randomBook));
    }//UNIT TEST 10

    @Test
    public void DuplicateEmailTest() { //INTEGRATION TEST 4
        Session session = HibernateORM.getSessionFactory().openSession();
        Query query = session.createQuery("from UsersEntity");
        List<UsersEntity> list = query.list();
        Random rand = new Random();
        String email = list.get(rand.nextInt(list.size())).getEmail();
        UsersEntity testUser = new UsersEntity();
        testUser.setUsername("tester");
        testUser.setFirstname("John");
        testUser.setEmail(email);
        testUser.setLastname("Doe");
        testUser.setPassword("Blah");
        testUser.setRole("user");
        assertTrue(db.AddUser(testUser, 100) == -1);
        UserForm testReader = new UserForm();
        testReader.setEmail(email);
        testReader.setAddress("");
        testReader.setPassword("");
        testReader.setZipcode("");
        testReader.setFirstname("Test");
        testReader.setLastname("User");
        assertTrue(db.AddReader(testReader) == -1);
    }
}
