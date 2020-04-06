package com.teal.library.springsecurityjwt;

import com.teal.library.springsecurityjwt.models.*;
import com.teal.library.springsecurityjwt.models.UsersEntity;
import com.teal.library.springsecurityjwt.viewmodels.UserForm;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LibraryRegistrationService {

    public int RegisterUser(UserForm user){ // throws EmailExistsException {
//        if (emailExist(user.getEmail())) {
//            throw new EmailExistsException(
//                    "There is an account with that email address:" + user.getEmail());
//        }

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        DataAccess db = new DataAccess();
            UsersEntity newUserModel = new UsersEntity();
            newUserModel.setFirstname(user.getFirstname());
            newUserModel.setLastname(user.getLastname());
            newUserModel.setPassword(passwordEncoder.encode(user.getPassword()));
            newUserModel.setEmail(user.getEmail());
            newUserModel.setRole("Admin");
            newUserModel.setUsername(user.getUsername());
            int readerid = db.AddReader(user);
            if(readerid != -1)
                return db.AddUser(newUserModel, readerid);
            else
                return readerid;
    }
}
