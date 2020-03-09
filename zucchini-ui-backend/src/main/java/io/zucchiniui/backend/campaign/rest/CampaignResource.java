package io.zucchiniui.backend.campaign.rest;

import io.zucchiniui.backend.campaign.domain.CampaignStatsService;
import io.zucchiniui.backend.campaign.domain.CampaignTestRunStats;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/campaigns")
@Component
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CampaignResource {

    private final CampaignStatsService campaignStatsService;

    public CampaignResource(CampaignStatsService campaignStatsService) {
        this.campaignStatsService = campaignStatsService;
    }

    @GET
    @Path("{campaign}/stats")
    public CampaignTestRunsStatsResponse getCampaignStats(@PathParam("campaign") String campaign){

        final List<CampaignTestRunStats> stats = this.campaignStatsService.computeCampaignTestRunsStats(campaign);

        return new CampaignTestRunsStatsResponse(campaign, stats);
    }

}
