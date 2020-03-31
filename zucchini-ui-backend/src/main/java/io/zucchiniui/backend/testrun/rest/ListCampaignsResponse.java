package io.zucchiniui.backend.testrun.rest;

import io.zucchiniui.backend.campaign.views.Campaign;

import java.util.List;

public class ListCampaignsResponse {

    private List<Campaign> campaigns;

    public ListCampaignsResponse(List<Campaign> campaigns) {
        this.campaigns = campaigns;
    }

    public List<Campaign> getCampaigns() {
        return campaigns;
    }

    public void setCampaigns(List<Campaign> campaigns) {
        this.campaigns = campaigns;
    }
}
