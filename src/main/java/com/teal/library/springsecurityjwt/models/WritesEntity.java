package com.teal.library.springsecurityjwt.models;

import javax.persistence.*;

@Entity
@Table(name = "writes", schema = "dbo", catalog = "library")
@IdClass(WritesEntityPK.class)
public class WritesEntity {
    private int authorid;
    private int docid;

    @Id
    @Column(name = "authorid")
    public int getAuthorid() {
        return authorid;
    }

    public void setAuthorid(int authorid) {
        this.authorid = authorid;
    }

    @Id
    @Column(name = "docid")
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

        WritesEntity that = (WritesEntity) o;

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
