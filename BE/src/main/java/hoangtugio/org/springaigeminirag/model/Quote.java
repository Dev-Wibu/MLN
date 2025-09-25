package hoangtugio.org.springaigeminirag.model;

public class Quote {
    private Long id;
    private String text;
    private String author;
    private String context;
    private String category;

    public Quote() {}

    public Quote(Long id, String text, String author, String context, String category) {
        this.id = id;
        this.text = text;
        this.author = author;
        this.context = context;
        this.category = category;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getContext() { return context; }
    public void setContext(String context) { this.context = context; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}