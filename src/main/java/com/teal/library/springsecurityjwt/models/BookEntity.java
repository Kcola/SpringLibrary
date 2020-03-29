package com.teal.library.springsecurityjwt.models;

import javax.persistence.*;

@Entity
@Table(name = "book", schema = "dbo", catalog = "library")
public class BookEntity {
    private int docid;
    private String isbn;

    @Id
    @Basic
    @Column(name = "docid")
    public int getDocid() {
        return docid;
    }

    public void setDocid(int docid) {
        this.docid = docid;
    }


    @Basic
    @Column(name = "isbn")
    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BookEntity that = (BookEntity) o;

        if (docid != that.docid) return false;
        if (isbn != null ? !isbn.equals(that.isbn) : that.isbn != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = docid;
        result = 31 * result + (isbn != null ? isbn.hashCode() : 0);
        return result;
    }
}
