package com.teal.library.springsecurityjwt.models;

import javax.persistence.*;

@Entity
@Table(name = "copy", schema = "dbo", catalog = "library")
public class CopyEntity {
    private int docid;
    private String copyid;
    private int libid;
    private String position;

    @Basic
    @Column(name = "docid")
    public int getDocid() {
        return docid;
    }

    public void setDocid(int docid) {
        this.docid = docid;
    }

    @Id
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
    @Column(name = "position")
    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CopyEntity that = (CopyEntity) o;

        if (docid != that.docid) return false;
        if (libid != that.libid) return false;
        if (copyid != null ? !copyid.equals(that.copyid) : that.copyid != null) return false;
        if (position != null ? !position.equals(that.position) : that.position != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = docid;
        result = 31 * result + (copyid != null ? copyid.hashCode() : 0);
        result = 31 * result + libid;
        result = 31 * result + (position != null ? position.hashCode() : 0);
        return result;
    }
}
