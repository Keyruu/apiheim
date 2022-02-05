package de.keyruu.model.repository;

import de.keyruu.model.Api;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class ApiRepository implements PanacheRepository<Api> {
  public List<Api> allApisWithoutFolder() {
    return streamAll().filter(api -> api.getFolder() == null).collect(Collectors.toList());
  }
}
