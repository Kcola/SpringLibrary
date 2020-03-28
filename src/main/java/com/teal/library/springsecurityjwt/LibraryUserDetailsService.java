package com.teal.library.springsecurityjwt;

import com.teal.library.springsecurityjwt.models.*;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LibraryUserDetailsService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        DataAccess db  = new DataAccess();
        if (!db.ExistsUser(username)) {
            throw new UsernameNotFoundException("User not found by name: " + username);
        }
        return toUserDetails(db.ValidateUser(username));
    }
    private UserDetails toUserDetails(UsersEntity userModel) {
        return User.withUsername(userModel.getUsername())
                .password(userModel.getPassword())
                .roles(userModel.getRole()).build();
    }
}