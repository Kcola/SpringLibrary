package com.teal.library.springsecurityjwt.viewmodels;

import java.sql.Date;

public class ReserveGrid {
    private int resnumber;
    private String title;
    private Date rtime;

    public int getResnumber() {
        return resnumber;
    }

    public void setResnumber(int resnumber) {
        this.resnumber = resnumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getRtime() {
        return rtime;
    }

    public void setRtime(Date rtime) {
        this.rtime = rtime;
    }

}
