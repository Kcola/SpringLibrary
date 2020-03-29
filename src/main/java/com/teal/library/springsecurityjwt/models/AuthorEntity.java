package com.teal.library.springsecurityjwt.models;

import javax.persistence.*;

@Entity
@Table(name = "author", schema = "dbo", catalog = "library")
public class AuthorEntity {
    private int authorid;
    private String aname;

    @Id
    @Column(name = "authorid")
    public int getAuthorid() {
        return authorid;
    }

    public void setAuthorid(int authorid) {
        this.authorid = authorid;
    }

    @Basic
    @Column(name = "aname")
    public String getAname() {
        return aname;
    }

    public void setAname(String aname) {
        this.aname = aname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AuthorEntity that = (AuthorEntity) o;

        if (authorid != that.authorid) return false;
        if (aname != null ? !aname.equals(that.aname) : that.aname != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = authorid;
        result = 31 * result + (aname != null ? aname.hashCode() : 0);
        return result;
    }
}
