package de.keyruu.rest;

import de.keyruu.model.Folder;
import de.keyruu.model.repository.FolderRepository;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/folder")
public class FolderResource {
  @Inject
  FolderRepository folderRepository;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public List<Folder> getAllFolders() {
    return folderRepository.listAll();
  }

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  @Transactional
  public Folder createFolder(Folder folder) {
    folderRepository.persist(folder);
    return folder;
  }

  @DELETE
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  @Transactional
  public Folder deleteFolder(Folder folder) {
    folderRepository.delete(folder);
    return folder;
  }
}
