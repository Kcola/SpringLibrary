package com.teal.library.springsecurityjwt.models;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "proceedings", schema = "Library", catalog = "")
public class ProceedingsEntity {
    private int docid;
    private Date cdate;
    private String clocation;
    private String ceditor;

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
    @Column(name = "cdate")
    public Date getCdate() {
        return cdate;
    }

    public void setCdate(Date cdate) {
        this.cdate = cdate;
    }

    @Basic
    @Column(name = "clocation")
    public String getClocation() {
        return clocation;
    }

    public void setClocation(String clocation) {
        this.clocation = clocation;
    }

    @Basic
    @Column(name = "ceditor")
    public String getCeditor() {
        return ceditor;
    }

    public void setCeditor(String ceditor) {
        this.ceditor = ceditor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProceedingsEntity that = (ProceedingsEntity) o;

        if (docid != that.docid) return false;
        if (cdate != null ? !cdate.equals(that.cdate) : that.cdate != null) return false;
        if (clocation != null ? !clocation.equals(that.clocation) : that.clocation != null) return false;
        if (ceditor != null ? !ceditor.equals(that.ceditor) : that.ceditor != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = docid;
        result = 31 * result + (cdate != null ? cdate.hashCode() : 0);
        result = 31 * result + (clocation != null ? clocation.hashCode() : 0);
        result = 31 * result + (ceditor != null ? ceditor.hashCode() : 0);
        return result;
    }
}
