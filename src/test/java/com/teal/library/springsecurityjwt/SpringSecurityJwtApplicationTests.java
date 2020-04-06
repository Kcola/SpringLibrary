package com.teal.library.springsecurityjwt;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;
@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringSecurityJwtApplicationTests {
	@Autowired
	private DataAccess db;
	@Test
	public void ExistsUserTest() {
		assertTrue(db.ExistsUser("kola") == true);
	}
	@Test
	public void GetAllBooksTest() {
		assertTrue(db.GetBooks().size() > 0);
	}
}
