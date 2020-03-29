package com.teal.library.springsecurityjwt.models;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "reserves", schema = "dbo", catalog = "library")
public class ReservesEntity {
    private int resnumber;
    private int readerid;
    private int docid;
    private String copyid;
    private int libid;
    private Date dtime;

    @Id
    @Column(name = "resnumber")
    public int getResnumber() {
        return resnumber;
    }

    public void setResnumber(int resnumber) {
        this.resnumber = resnumber;
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
    @Column(name = "DTIME")
    public Date getDtime() {
        return dtime;
    }

    public void setDtime(Date dtime) {
        this.dtime = dtime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ReservesEntity that = (ReservesEntity) o;

        if (resnumber != that.resnumber) return false;
        if (readerid != that.readerid) return false;
        if (docid != that.docid) return false;
        if (libid != that.libid) return false;
        if (copyid != null ? !copyid.equals(that.copyid) : that.copyid != null) return false;
        if (dtime != null ? !dtime.equals(that.dtime) : that.dtime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = resnumber;
        result = 31 * result + readerid;
        result = 31 * result + docid;
        result = 31 * result + (copyid != null ? copyid.hashCode() : 0);
        result = 31 * result + libid;
        result = 31 * result + (dtime != null ? dtime.hashCode() : 0);
        return result;
    }
}
