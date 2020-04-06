package com.teal.library.springsecurityjwt.viewmodels;

import java.util.Date;

public class BorrowForm {
    private String isbn;
    private String username;
    private String duration;
    private int readerid;

    public int getReaderid() {
        return readerid;
    }

    public void setReaderid(int readerid) {
        this.readerid = readerid;
    }


    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
