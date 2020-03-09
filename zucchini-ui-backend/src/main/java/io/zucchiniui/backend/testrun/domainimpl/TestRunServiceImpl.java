package io.zucchiniui.backend.testrun.domainimpl;

import io.zucchiniui.backend.feature.domain.FeatureService;
import io.zucchiniui.backend.scenario.dao.ScenarioDAO;
import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.testrun.domain.TestRun;
import io.zucchiniui.backend.testrun.domain.TestRunRepository;
import io.zucchiniui.backend.testrun.domain.TestRunService;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Component
class TestRunServiceImpl implements TestRunService {

    private final TestRunRepository testRunRepository;

    private final FeatureService featureService;

    private final ScenarioDAO scenarioDAO;

    public TestRunServiceImpl(final TestRunRepository testRunRepository, final FeatureService featureService, ScenarioDAO scenarioDAO) {
        this.testRunRepository = testRunRepository;
        this.featureService = featureService;
        this.scenarioDAO = scenarioDAO;
    }

    @Override
    public void deleteById(final String testRunId) {
        featureService.deleteByTestRunId(testRunId);

        final TestRun testRun = testRunRepository.getById(testRunId);
        testRunRepository.delete(testRun);
    }

    @Override
    public List<TestRun> findAllByCampaign(String campaign) {
        // return return testRunRepository.query(prep -> prep.);
        return Collections.emptyList();
    }

    /**
     * {@inheritDoc
     */
    @Override
    public void computeAndStoreNumberOfScenariosToReview(String testRunId) {
        final TestRun testRun = testRunRepository.getById(testRunId);
        if (Objects.isNull(testRun)) {
            throw new IllegalStateException("Can't find a test run with id " + testRunId);
        }
        long numberOfScenariosToReview = scenarioDAO.createQuery()
            .field("testRunId").equal(testRunId)
            .asList()
            .stream()
            .filter(Scenario::isNotReviewed).count();
        testRun.setNumberOfScenariosToReviewAtImport((int) numberOfScenariosToReview);
        testRunRepository.save(testRun);
    }
}
