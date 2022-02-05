package de.keyruu.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Folder {
  @Id
  @GeneratedValue
  private Long id;

  private String name;

  @OneToMany(fetch = FetchType.EAGER, mappedBy = "folder")
  @JsonManagedReference
  private List<Api> apis;

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

  public List<Api> getApis() {
    return apis;
  }

  public void addApi(Api api) {
    apis.add(api);
  }

  public void removeApi(Api api) {
    apis.remove(api);
  }

  public void setApis(List<Api> apis) {
    this.apis = apis;
  }
}
