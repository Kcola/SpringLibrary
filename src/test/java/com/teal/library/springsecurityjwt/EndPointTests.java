package com.teal.library.springsecurityjwt;

import com.google.gson.Gson;
import com.teal.library.springsecurityjwt.models.AuthenticationResponse;
import com.teal.library.springsecurityjwt.models.BorrowsEntity;
import com.teal.library.springsecurityjwt.models.ReaderEntity;
import com.teal.library.springsecurityjwt.viewmodels.BorNumber;
import com.teal.library.springsecurityjwt.viewmodels.BorrowForm;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.List;
import java.util.Random;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EndPointTests {

    @Test
    public void AuthtenticateTest() throws IOException { //INTEGRATION TEST 2
        HttpClient client = HttpClientBuilder.create().build();
        Random rand = new Random();
        String generatedUsername = RandomStringUtils.randomAlphabetic(rand.nextInt(1000));
        String generatedPassword = RandomStringUtils.randomAlphabetic(rand.nextInt(1000));
        HttpPost post = new HttpPost("http://localhost:8080/api/authenticate");
        String json = "{\"username\":\"" + generatedUsername + "\",\"password\":\"" + generatedPassword + "\"}";
        StringEntity entity = new StringEntity(json);
        post.setEntity(entity);
        post.setHeader("Accept", "application/json");
        post.setHeader("Content-type", "application/json");
        HttpResponse response = client.execute(post);
        int statusCode = response.getStatusLine().getStatusCode();
        assertEquals(HttpStatus.SC_FORBIDDEN, statusCode);
    }

    @Test
    public void CurrentUserTest() throws IOException { //SYSTEM TEST 3
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost postLogin = new HttpPost("http://localhost:8080/api/authenticate");
        String jsonLogin = "{\"username\":\"bot\",\"password\":\"test123\"}";
        StringEntity entity = new StringEntity(jsonLogin);
        postLogin.setEntity(entity);
        postLogin.setHeader("Accept", "application/json");
        postLogin.setHeader("Content-type", "application/json");
        HttpResponse loginResponse = client.execute(postLogin);
        HttpEntity responseEntity = loginResponse.getEntity();
        String responseBody = "";
        if (responseEntity != null) {
            responseBody = EntityUtils.toString(responseEntity);
        }
        Gson gson = new Gson();
        AuthenticationResponse tokenObj = gson.fromJson(responseBody, AuthenticationResponse.class);

        HttpGet getUserDetails = new HttpGet("http://localhost:8080/api/userinfo");
        getUserDetails.setHeader("Accept", "application/json");
        getUserDetails.setHeader("Content-type", "application/json");
        getUserDetails.setHeader("Authorization", "Bearer " + tokenObj.getJwt());
        HttpResponse userDetailResponse = client.execute(getUserDetails);
        HttpEntity userDetailsResponseEntity = userDetailResponse.getEntity();
        if (userDetailsResponseEntity != null) {
            responseBody = EntityUtils.toString(userDetailsResponseEntity);
        }
        ReaderEntity userDetailsObj = gson.fromJson(responseBody, ReaderEntity.class);
        assertEquals(8, userDetailsObj.getReaderid());
    }

    @Test
    public void BorrowTest() throws IOException { //SYSTEM TEST 4
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost postLogin = new HttpPost("http://localhost:8080/api/authenticate");
        String jsonLogin = "{\"username\":\"bot\",\"password\":\"test123\"}";
        StringEntity entity = new StringEntity(jsonLogin);
        postLogin.setEntity(entity);
        postLogin.setHeader("Accept", "application/json");
        postLogin.setHeader("Content-type", "application/json");
        HttpResponse loginResponse = client.execute(postLogin);
        HttpEntity responseEntity = loginResponse.getEntity();
        String responseBody = "";
        if (responseEntity != null) {
            responseBody = EntityUtils.toString(responseEntity);
        }
        Gson gson = new Gson();
        AuthenticationResponse tokenObj = gson.fromJson(responseBody, AuthenticationResponse.class);
        HttpPost postBorrow = new HttpPost("http://localhost:8080/api/borrow");
        postBorrow.setHeader("Accept", "application/json");
        postBorrow.setHeader("Content-type", "application/json");
        postBorrow.setHeader("Authorization", "Bearer " + tokenObj.getJwt());
        BorrowForm form = new BorrowForm();
        form.setDuration("14d");
        form.setIsbn("684747738-5");
        form.setReaderid(8);
        form.setUsername("bot");
        String jsonBorrow = gson.toJson(form);
        StringEntity borEntity = new StringEntity(jsonBorrow);
        postBorrow.setEntity(borEntity);
        HttpResponse borrowResponse = client.execute(postBorrow);
        HttpEntity borrowResponseEntity = borrowResponse.getEntity();
        if (borrowResponseEntity != null) {
            responseBody = EntityUtils.toString(borrowResponseEntity);
        }
        int borNumber = Integer.parseInt(responseBody);
        if (borNumber > 0) {
            HttpPost postReturn = new HttpPost("http://localhost:8080/api/return");
            postReturn.setHeader("Accept", "application/json");
            postReturn.setHeader("Content-type", "application/json");
            postReturn.setHeader("Authorization", "Bearer " + tokenObj.getJwt());
            BorNumber book = new BorNumber();
            book.setBornumber(borNumber);
            String jsonReturn = gson.toJson(book);
            StringEntity returnEntity = new StringEntity(jsonReturn);
            postReturn.setEntity(returnEntity);
            HttpResponse returnResponse = client.execute(postReturn);
            Session session = HibernateORM.getSessionFactory().openSession();
            Query query = session.createQuery("from BorrowsEntity where bornumber = :bornumber");
            query.setParameter("bornumber", borNumber);
            List<BorrowsEntity> list = query.list();
            session.close();
            assertNotEquals(0, list.size());
            assertNotEquals(list.get(0).getRtime(), null);
        }
    }
}
