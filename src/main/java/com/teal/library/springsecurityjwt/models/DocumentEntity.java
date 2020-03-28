package com.teal.library.springsecurityjwt.models;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "document", schema = "Library", catalog = "")
public class DocumentEntity {
    private int docid;
    private String title;
    private Date pdate;
    private int publisherid;

    @Id
    @Column(name = "docid")
    public int getDocid() {
        return docid;
    }

    public void setDocid(int docid) {
        this.docid = docid;
    }

    @Basic
    @Column(name = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "pdate")
    public Date getPdate() {
        return pdate;
    }

    public void setPdate(Date pdate) {
        this.pdate = pdate;
    }

    @Basic
    @Column(name = "publisherid")
    public int getPublisherid() {
        return publisherid;
    }

    public void setPublisherid(int publisherid) {
        this.publisherid = publisherid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DocumentEntity that = (DocumentEntity) o;

        if (docid != that.docid) return false;
        if (publisherid != that.publisherid) return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;
        if (pdate != null ? !pdate.equals(that.pdate) : that.pdate != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = docid;
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (pdate != null ? pdate.hashCode() : 0);
        result = 31 * result + publisherid;
        return result;
    }
}
