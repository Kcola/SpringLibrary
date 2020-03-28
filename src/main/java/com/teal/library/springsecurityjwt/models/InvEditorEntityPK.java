package com.teal.library.springsecurityjwt.models;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class InvEditorEntityPK implements Serializable {
    private int docid;
    private int issueNo;
    private String iename;

    @Column(name = "docid")
    @Id
    public int getDocid() {
        return docid;
    }

    public void setDocid(int docid) {
        this.docid = docid;
    }

    @Column(name = "issue_no")
    @Id
    public int getIssueNo() {
        return issueNo;
    }

    public void setIssueNo(int issueNo) {
        this.issueNo = issueNo;
    }

    @Column(name = "Iename")
    @Id
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

        InvEditorEntityPK that = (InvEditorEntityPK) o;

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
