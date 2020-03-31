package io.zucchiniui.backend.campaign.domain;

import io.zucchiniui.backend.campaign.views.Campaign;
import io.zucchiniui.backend.campaign.views.CampaignTestRun;

import java.util.List;

public interface CampaignService {

    List<CampaignTestRun> computeCampaignTestRunsStats(String campaign);

    /**
     * List all unique campaigns names referenced in testRuns.
     *
     * @return a list of unique campaign names.
     */
    List<Campaign> listCampaigns();

}
