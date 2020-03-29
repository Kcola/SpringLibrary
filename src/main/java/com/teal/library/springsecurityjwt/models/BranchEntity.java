package com.teal.library.springsecurityjwt.models;

import javax.persistence.*;

@Entity
@Table(name = "branch", schema = "dbo", catalog = "library")
public class BranchEntity {
    private int libid;
    private String lname;
    private String llocation;

    @Id
    @Column(name = "libid")
    public int getLibid() {
        return libid;
    }

    public void setLibid(int libid) {
        this.libid = libid;
    }

    @Basic
    @Column(name = "lname")
    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    @Basic
    @Column(name = "llocation")
    public String getLlocation() {
        return llocation;
    }

    public void setLlocation(String llocation) {
        this.llocation = llocation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BranchEntity that = (BranchEntity) o;

        if (libid != that.libid) return false;
        if (lname != null ? !lname.equals(that.lname) : that.lname != null) return false;
        if (llocation != null ? !llocation.equals(that.llocation) : that.llocation != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = libid;
        result = 31 * result + (lname != null ? lname.hashCode() : 0);
        result = 31 * result + (llocation != null ? llocation.hashCode() : 0);
        return result;
    }
}
