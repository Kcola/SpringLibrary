package com.teal.library.springsecurityjwt.controllers;

import com.teal.library.springsecurityjwt.DataAccess;
import com.teal.library.springsecurityjwt.viewmodels.BookGrid;
import com.teal.library.springsecurityjwt.viewmodels.BorrowForm;
import com.teal.library.springsecurityjwt.viewmodels.UserForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class BooksController {
    private static final Logger LOGGER = LoggerFactory.getLogger(LoginController.AuthController.class);
    @Autowired
    private DataAccess db;

    @RequestMapping(value = "api/books", method = RequestMethod.GET)
    public ResponseEntity<List<BookGrid>> GetBooks() {
        return ResponseEntity.ok(db.GetBooks());
    }

    @RequestMapping(value = "/api/borrow", method = RequestMethod.POST)
    public ResponseEntity<?> RegisterUser(@RequestBody BorrowForm user){
        LOGGER.info("Received request from /register endpoint");
        boolean flag = db.ExistsUser(user.getUsername());
        if(flag) {
            try {
                int success = db.BorrowBook(user);
                if(success > 0)
                    return ResponseEntity.ok("");
                else
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } catch (Exception e) {
                LOGGER.info(e.getMessage());
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
