package com.teal.library.springsecurityjwt.viewmodels;

import java.sql.Date;

public class BorrowGrid {
    private int bornumber;
    private String title;
    private Date btime;
    private Date rtime;
    private double fines;
    private Date duedate;

    public int getBornumber() {
        return bornumber;
    }

    public void setBornumber(int bornumber) {
        this.bornumber = bornumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getBtime() {
        return btime;
    }

    public void setBtime(Date btime) {
        this.btime = btime;
    }

    public Date getRtime() {
        return rtime;
    }

    public void setRtime(Date rtime) {
        this.rtime = rtime;
    }

    public double getFines() {
        return fines;
    }

    public void setFines(Double fines) {
        this.fines = fines;
    }

    public Date getDuedate() {
        return duedate;
    }

    public void setDuedate(Date duedate) {
        this.duedate = duedate;
    }
}
