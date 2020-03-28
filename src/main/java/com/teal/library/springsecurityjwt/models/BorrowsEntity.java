package com.teal.library.springsecurityjwt.models;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "borrows", schema = "Library", catalog = "")
public class BorrowsEntity {
    private int bornumber;
    private int readerid;
    private int docid;
    private String copyid;
    private int libid;
    private Date btime;
    private Date rtime;
    private double fines;

    @Id
    @Column(name = "bornumber")
    public int getBornumber() {
        return bornumber;
    }

    public void setBornumber(int bornumber) {
        this.bornumber = bornumber;
    }

    @Basic
    @Column(name = "readerid")
    public int getReaderid() {
        return readerid;
    }

    public void setReaderid(int readerid) {
        this.readerid = readerid;
    }

    @Basic
    @Column(name = "docid")
    public int getDocid() {
        return docid;
    }

    public void setDocid(int docid) {
        this.docid = docid;
    }

    @Basic
    @Column(name = "copyid")
    public String getCopyid() {
        return copyid;
    }

    public void setCopyid(String copyid) {
        this.copyid = copyid;
    }

    @Basic
    @Column(name = "libid")
    public int getLibid() {
        return libid;
    }

    public void setLibid(int libid) {
        this.libid = libid;
    }

    @Basic
    @Column(name = "btime")
    public Date getBtime() {
        return btime;
    }

    public void setBtime(Date btime) {
        this.btime = btime;
    }

    @Basic
    @Column(name = "rtime")
    public Date getRtime() {
        return rtime;
    }

    public void setRtime(Date rtime) {
        this.rtime = rtime;
    }

    @Basic
    @Column(name = "fines")
    public double getFines() {
        return fines;
    }

    public void setFines(double fines) {
        this.fines = fines;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BorrowsEntity that = (BorrowsEntity) o;

        if (bornumber != that.bornumber) return false;
        if (readerid != that.readerid) return false;
        if (docid != that.docid) return false;
        if (libid != that.libid) return false;
        if (Double.compare(that.fines, fines) != 0) return false;
        if (copyid != null ? !copyid.equals(that.copyid) : that.copyid != null) return false;
        if (btime != null ? !btime.equals(that.btime) : that.btime != null) return false;
        if (rtime != null ? !rtime.equals(that.rtime) : that.rtime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = bornumber;
        result = 31 * result + readerid;
        result = 31 * result + docid;
        result = 31 * result + (copyid != null ? copyid.hashCode() : 0);
        result = 31 * result + libid;
        result = 31 * result + (btime != null ? btime.hashCode() : 0);
        result = 31 * result + (rtime != null ? rtime.hashCode() : 0);
        temp = Double.doubleToLongBits(fines);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }
}
