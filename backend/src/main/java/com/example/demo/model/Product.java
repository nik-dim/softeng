package com.example.demo.model;


import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;
    private String description;
    private String category;  // should it be an enum?
    // add TAGS
    private Boolean withdrawn;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "product_tag",
            joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id")
    )
    private List<Tag> tags ;


    public void addTag(Tag tag) {
        tags.add(tag);
        tag.getProducts().add(this);
    }

    public void removeTag(Tag tag) {
        tags.remove(tag);
        tag.getProducts().remove(this);
    }



    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public Product() {}

    public Product(String name, String description, String category, Boolean withdrawn, List<Tag> tags) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.withdrawn = withdrawn;
        this.tags = tags;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Boolean getWithdrawn() {
        return withdrawn;
    }

    public void setWithdrawn(Boolean withdrawn) {
        this.withdrawn = withdrawn;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product)) return false;
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                ", withdrawn=" + withdrawn +
                ", tags=" + tags +
                '}';
    }
}
