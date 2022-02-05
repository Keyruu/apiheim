package de.keyruu.model.repository;

import de.keyruu.model.Folder;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class FolderRepository implements PanacheRepository<Folder> {
}
