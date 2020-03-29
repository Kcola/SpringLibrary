package com.teal.library.springsecurityjwt.models;

import javax.persistence.*;

@Entity
@Table(name = "journal_issue", schema = "dbo", catalog = "library")
public class JournalIssueEntity {
    private int docid;
    private int issueNo;
    private String scope;

    @Basic
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

    @Basic
    @Column(name = "SCOPE")
    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        JournalIssueEntity that = (JournalIssueEntity) o;

        if (docid != that.docid) return false;
        if (issueNo != that.issueNo) return false;
        if (scope != null ? !scope.equals(that.scope) : that.scope != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = docid;
        result = 31 * result + issueNo;
        result = 31 * result + (scope != null ? scope.hashCode() : 0);
        return result;
    }
}
