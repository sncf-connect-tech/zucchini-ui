package io.zucchiniui.backend.campaign.domain;

import io.zucchiniui.backend.campaign.views.CampaignTestRun;

import java.util.List;

public interface CampaignService {

    List<CampaignTestRun> computeCampaignTestRunsStats(String campaign);

}
