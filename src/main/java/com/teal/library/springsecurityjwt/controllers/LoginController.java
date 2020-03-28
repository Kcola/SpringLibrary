package com.teal.library.springsecurityjwt.controllers;
import com.teal.library.springsecurityjwt.DataAccess;
import com.teal.library.springsecurityjwt.HibernateORM;
import com.teal.library.springsecurityjwt.LibraryRegistrationService;
import com.teal.library.springsecurityjwt.LibraryUserDetailsService;
import com.teal.library.springsecurityjwt.models.AuthenticationRequest;
import com.teal.library.springsecurityjwt.models.AuthenticationResponse;
import com.teal.library.springsecurityjwt.util.JwtUtil;
import com.teal.library.springsecurityjwt.viewmodels.UserForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.hibernate.Session;
import org.hibernate.query.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@RestController
class LoginController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private LibraryRegistrationService registrationService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private LibraryUserDetailsService userDetailsService;

    @Autowired
    private HibernateORM hibernate;

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    @RequestMapping({ "/api/hello" })
    public String firstPage() {
        LOGGER.info("Received request from /hello endpoint");
        return "Hello World";
    }

    @RequestMapping(value = "/api/register", method = RequestMethod.POST)
    public ResponseEntity<?> RegisterUser(@RequestBody UserForm user){
        LOGGER.info("Received request from /register endpoint");
        DataAccess db = new DataAccess();
        boolean flag = db.ExistsUser(user.getUsername());
        if(!flag) {
            try {
                int success = registrationService.RegisterUser(user);
                if(success != -1)
                    return ResponseEntity.ok("");
                else
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } catch (Exception e) {
                LOGGER.info(e.getMessage());
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RestController
    static
    class AuthController {

        @Autowired
        private AuthenticationManager authenticationManager;

        @Autowired
        private JwtUtil jwtTokenUtil;

        @Autowired
        private LibraryUserDetailsService userDetailsService;

        private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

        @RequestMapping({ "/hello" })
        public String firstPage() {
            LOGGER.info("Received request from /hello endpoint");
            return "Hello World";
        }

        @RequestMapping(value = "/api/authenticate", method = RequestMethod.POST)
        public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {

            LOGGER.info("Received request from /authenticate endpoint - attempting to authenticate" +authenticationRequest.getUsername()+" "+ authenticationRequest.getPassword());

            try {
                PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
                );
            }
            catch (BadCredentialsException e) {
                throw new Exception("Incorrect username or password", e);
            }


            final UserDetails userDetails = userDetailsService
                    .loadUserByUsername(authenticationRequest.getUsername());

            final String jwt = jwtTokenUtil.generateToken(userDetails);

            LOGGER.info("User authentication complete - returning jwt token to client");
            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        }

    }
}
