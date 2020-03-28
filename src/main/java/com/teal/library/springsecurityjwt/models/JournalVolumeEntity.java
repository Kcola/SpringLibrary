package com.teal.library.springsecurityjwt.models;

import javax.persistence.*;

@Entity
@Table(name = "journal_volume", schema = "Library", catalog = "")
public class JournalVolumeEntity {
    private int docid;
    private int jvolume;
    private int editorId;

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
    @Column(name = "jvolume")
    public int getJvolume() {
        return jvolume;
    }

    public void setJvolume(int jvolume) {
        this.jvolume = jvolume;
    }

    @Basic
    @Column(name = "editor_id")
    public int getEditorId() {
        return editorId;
    }

    public void setEditorId(int editorId) {
        this.editorId = editorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        JournalVolumeEntity that = (JournalVolumeEntity) o;

        if (docid != that.docid) return false;
        if (jvolume != that.jvolume) return false;
        if (editorId != that.editorId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = docid;
        result = 31 * result + jvolume;
        result = 31 * result + editorId;
        return result;
    }
}
