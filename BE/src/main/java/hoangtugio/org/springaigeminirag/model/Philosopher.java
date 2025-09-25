package hoangtugio.org.springaigeminirag.model;

public class Philosopher {
    private Long id;
    private String name;
    private String birthYear;
    private String deathYear;
    private String nationality;
    private String description;
    private String imageUrl;

    public Philosopher() {}

    public Philosopher(Long id, String name, String birthYear, String deathYear, String nationality, String description, String imageUrl) {
        this.id = id;
        this.name = name;
        this.birthYear = birthYear;
        this.deathYear = deathYear;
        this.nationality = nationality;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBirthYear() { return birthYear; }
    public void setBirthYear(String birthYear) { this.birthYear = birthYear; }

    public String getDeathYear() { return deathYear; }
    public void setDeathYear(String deathYear) { this.deathYear = deathYear; }

    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}