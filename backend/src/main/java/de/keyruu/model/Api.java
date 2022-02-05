package de.keyruu.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.smallrye.common.constraint.NotNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Api {
  @Id
  @GeneratedValue
  private Long id;

  @NotNull
  private String name;

  @NotNull
  private String url;

  private String description;

  @NotNull
  private ApiType apiType;

  @ManyToOne
  @JsonBackReference
  private Folder folder;

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

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public ApiType getApiType() {
    return apiType;
  }

  public void setApiType(ApiType apiType) {
    this.apiType = apiType;
  }

  public Folder getFolder() {
    return folder;
  }

  public void setFolder(Folder folder) {
    this.folder = folder;
  }
}
