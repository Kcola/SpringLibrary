package com.teal.library.springsecurityjwt.controllers;

import com.teal.library.springsecurityjwt.DataAccess;
import com.teal.library.springsecurityjwt.viewmodels.BookGrid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BooksController {
    @Autowired
    private DataAccess db;

    @RequestMapping(value = "api/books", method = RequestMethod.GET)
    public ResponseEntity<List<BookGrid>> GetBooks() {
        return ResponseEntity.ok(db.GetBooks());
    }
}
