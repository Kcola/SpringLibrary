package com.teal.library.springsecurityjwt.models;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class WritesEntityPK implements Serializable {
    private int authorid;
    private int docid;

    @Column(name = "authorid")
    @Id
    public int getAuthorid() {
        return authorid;
    }

    public void setAuthorid(int authorid) {
        this.authorid = authorid;
    }

    @Column(name = "docid")
    @Id
    public int getDocid() {
        return docid;
    }

    public void setDocid(int docid) {
        this.docid = docid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        WritesEntityPK that = (WritesEntityPK) o;

        if (authorid != that.authorid) return false;
        if (docid != that.docid) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = authorid;
        result = 31 * result + docid;
        return result;
    }
}
