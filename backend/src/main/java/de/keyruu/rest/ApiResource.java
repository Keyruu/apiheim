package de.keyruu.rest;

import de.keyruu.model.Api;
import de.keyruu.model.repository.ApiRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.List;

@ApplicationScoped
@Path("/api")
public class ApiResource {
  @Inject
  ApiRepository apiRepository;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public List<Api> getAllApis(@QueryParam("folder") boolean folder) {
    return folder ? apiRepository.listAll() : apiRepository.allApisWithoutFolder();
  }

  @Path("{id}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Api getApi(@PathParam("id") Long id) {
    return apiRepository.findById(id);
  }

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  @Transactional
  public Api createApi(Api api) {
    apiRepository.persist(api);
    return api;
  }

  @Path("{id}")
  @DELETE
  @Transactional
  public Response deleteApi(@PathParam("id") String id) {
    apiRepository.deleteById(Long.valueOf(id));
    return Response.noContent().build();
  }
}
