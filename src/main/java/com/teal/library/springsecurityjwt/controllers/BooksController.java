package com.teal.library.springsecurityjwt.controllers;

import com.teal.library.springsecurityjwt.DataAccess;
import com.teal.library.springsecurityjwt.viewmodels.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> BorrowBook(@RequestBody BorrowForm user) {
        LOGGER.info("Received request from /borrow endpoint");
        boolean flag = db.ExistsUser(user.getUsername());
        if (flag) {
            try {
                int success = db.BorrowBook(user);
                if (success > 0)
                    return ResponseEntity.ok(success);
                else
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } catch (Exception e) {
                LOGGER.info(e.getMessage());
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/api/reserve", method = RequestMethod.POST)
    public ResponseEntity<?> ReserveBook(@RequestBody BorrowForm user) {
        LOGGER.info("Received request from /borrow endpoint");
        boolean flag = db.ExistsUser(user.getUsername());
        if (flag) {
            try {
                int success = db.ReserveBook(user);
                if (success > 0)
                    return ResponseEntity.ok(success);
                else
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } catch (Exception e) {
                LOGGER.info(e.getMessage());
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/api/borrowed", method = RequestMethod.POST)
    public ResponseEntity<?> BorrowedBooks(@RequestBody ReaderID user) {
        LOGGER.info("Received request from /borrowed endpoint");
        try {
            List<BorrowGrid> success = db.Borrowed(user.getReaderID());
            return ResponseEntity.ok(success);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/api/reserved", method = RequestMethod.POST)
    public ResponseEntity<?> ReservedBooks(@RequestBody ReaderID user) {
        LOGGER.info("Received request from /borrowed endpoint");
        try {
            List<ReserveGrid> success = db.Reserved(user.getReaderID());
            return ResponseEntity.ok(success);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/api/history", method = RequestMethod.POST)
    public ResponseEntity<?> History(@RequestBody ReaderID user) {
        LOGGER.info("Received request from /history endpoint");
        try {
            List<BorrowGrid> success = db.History(user.getReaderID());
            return ResponseEntity.ok(success);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/api/return", method = RequestMethod.POST)
    public ResponseEntity<?> ReturnBook(@RequestBody BorNumber book) {
        LOGGER.info("Received request from /borrowed endpoint");
        try {
            db.Return(book.getBornumber());
            return ResponseEntity.ok("Updated");

        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
