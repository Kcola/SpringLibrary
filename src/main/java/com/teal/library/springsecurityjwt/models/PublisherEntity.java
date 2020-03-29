package com.teal.library.springsecurityjwt.models;

import javax.persistence.*;

@Entity
@Table(name = "publisher", schema = "dbo", catalog = "library")
public class PublisherEntity {
    private int publisherid;
    private String pubname;
    private String address;
    private String zipcode;

    @Id
    @Column(name = "publisherid")
    public int getPublisherid() {
        return publisherid;
    }

    public void setPublisherid(int publisherid) {
        this.publisherid = publisherid;
    }

    @Basic
    @Column(name = "pubname")
    public String getPubname() {
        return pubname;
    }

    public void setPubname(String pubname) {
        this.pubname = pubname;
    }

    @Basic
    @Column(name = "address")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PublisherEntity that = (PublisherEntity) o;

        if (publisherid != that.publisherid) return false;
        if (pubname != null ? !pubname.equals(that.pubname) : that.pubname != null) return false;
        if (address != null ? !address.equals(that.address) : that.address != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = publisherid;
        result = 31 * result + (pubname != null ? pubname.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        return result;
    }

    @Basic
    @Column(name = "zipcode")
    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }
}
