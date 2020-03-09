package io.zucchiniui.backend.campaign.domain;

import java.util.List;

public interface CampaignStatsService {

    List<CampaignTestRunStats> computeCampaignTestRunsStats(String campaign);

}
