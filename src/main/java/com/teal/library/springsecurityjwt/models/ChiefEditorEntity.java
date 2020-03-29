package com.teal.library.springsecurityjwt.models;

import javax.persistence.*;

@Entity
@Table(name = "chief_editor", schema = "dbo", catalog = "library")
public class ChiefEditorEntity {
    private int editorId;
    private String ename;

    @Id
    @Column(name = "editor_id")
    public int getEditorId() {
        return editorId;
    }

    public void setEditorId(int editorId) {
        this.editorId = editorId;
    }

    @Basic
    @Column(name = "ename")
    public String getEname() {
        return ename;
    }

    public void setEname(String ename) {
        this.ename = ename;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ChiefEditorEntity that = (ChiefEditorEntity) o;

        if (editorId != that.editorId) return false;
        if (ename != null ? !ename.equals(that.ename) : that.ename != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = editorId;
        result = 31 * result + (ename != null ? ename.hashCode() : 0);
        return result;
    }
}
