package io.zucchiniui.backend.campaign.domain;

import io.zucchiniui.backend.campaign.domain.CampaignTestRunStats.ScenariosStats.FailedScenariosStats.Builder;
import io.zucchiniui.backend.scenario.dao.ScenarioDAO;
import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.scenario.domain.ScenarioStatus;
import io.zucchiniui.backend.testrun.dao.TestRunDAO;
import io.zucchiniui.backend.testrun.domain.TestRun;
import org.springframework.stereotype.Component;

import java.util.List;

import static java.util.Objects.isNull;
import static java.util.stream.Collectors.toList;

/**
 * Default impl for {@link CampaignStatsService} interface.
 */
@Component
public class CampaignStatsServiceImpl implements CampaignStatsService {

    private final TestRunDAO testRunDAO;
    private final ScenarioDAO scenarioDAO;

    public CampaignStatsServiceImpl(TestRunDAO testRunDAO, ScenarioDAO scenarioDAO) {
        this.testRunDAO = testRunDAO;
        this.scenarioDAO = scenarioDAO;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<CampaignTestRunStats> computeCampaignTestRunsStats(String campaign) {
        final List<TestRun> campaignTestRuns = testRunDAO.findAllByCampaign(campaign);
        return campaignTestRuns.stream()
            .map(testRun -> {
                final CampaignTestRunStats campaignTestRunStats = new CampaignTestRunStats();
                campaignTestRunStats.setType(testRun.getType());
                campaignTestRunStats.setScenarios(computeScenariosStats(testRun));
                return campaignTestRunStats;
            }).collect(toList());
    }

    /**
     * Compute scenarios stats for a given test run.
     *
     * @param testRun the test run
     * @return a {@link io.zucchiniui.backend.campaign.domain.CampaignTestRunStats.ScenariosStats}
     */
    private CampaignTestRunStats.ScenariosStats computeScenariosStats(TestRun testRun) {
        final List<Scenario> scenarios = scenarioDAO.createQuery()
            .field("testRunId").equal(testRun.getId())
            .asList();
        final List<Scenario> failedScenarios = scenarios.stream()
            .filter(scenario -> ScenarioStatus.FAILED.equals(scenario.getStatus()))
            .collect(toList());
        final Builder failedScenariosStatsBuilder = new Builder()
            .withTotal(failedScenarios.size())
            .withReviewed((int) scenarios.stream()
                .filter(Scenario::isReviewed)
                .count());
        if (!isNull(testRun.getNumberOfScenariosToReviewAtImport())) {
            failedScenariosStatsBuilder.withToReviewAtImport(testRun.getNumberOfScenariosToReviewAtImport());
        }
        return new CampaignTestRunStats.ScenariosStats(scenarios.size(), failedScenariosStatsBuilder.build());
    }

}
