package com.teal.library.springsecurityjwt.viewmodels;

public class BookGrid {
    private int docid;
    private String title;
    private String pdate;
    private String publisher;
    private String isbn;
    private String genre;

    public BookGrid(int docid, String title, String pdate, String publisher, String isbn, String genre) {
        this.docid = docid;
        this.title = title;
        this.pdate = pdate;
        this.publisher = publisher;
        this.isbn = isbn;
        this.genre = genre;
    }

    public int getDocid() {
        return docid;
    }

    public void setDocid(int docid) {
        this.docid = docid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPdate() {
        return pdate;
    }

    public void setPdate(String pdate) {
        this.pdate = pdate;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }
}
