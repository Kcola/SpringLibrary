package com.teal.library.springsecurityjwt.models;

import javax.persistence.*;

@Entity
@Table(name = "inv_editor", schema = "Library", catalog = "")
@IdClass(InvEditorEntityPK.class)
public class InvEditorEntity {
    private int docid;
    private int issueNo;
    private String iename;

    @Id
    @Column(name = "docid")
    public int getDocid() {
        return docid;
    }

    public void setDocid(int docid) {
        this.docid = docid;
    }

    @Id
    @Column(name = "issue_no")
    public int getIssueNo() {
        return issueNo;
    }

    public void setIssueNo(int issueNo) {
        this.issueNo = issueNo;
    }

    @Id
    @Column(name = "Iename")
    public String getIename() {
        return iename;
    }

    public void setIename(String iename) {
        this.iename = iename;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        InvEditorEntity that = (InvEditorEntity) o;

        if (docid != that.docid) return false;
        if (issueNo != that.issueNo) return false;
        if (iename != null ? !iename.equals(that.iename) : that.iename != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = docid;
        result = 31 * result + issueNo;
        result = 31 * result + (iename != null ? iename.hashCode() : 0);
        return result;
    }
}
