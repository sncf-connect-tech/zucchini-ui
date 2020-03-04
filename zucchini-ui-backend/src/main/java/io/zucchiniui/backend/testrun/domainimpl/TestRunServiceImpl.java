package io.zucchiniui.backend.testrun.domainimpl;

import io.zucchiniui.backend.feature.domain.FeatureService;
import io.zucchiniui.backend.testrun.domain.TestRun;
import io.zucchiniui.backend.testrun.domain.TestRunRepository;
import io.zucchiniui.backend.testrun.domain.TestRunService;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
class TestRunServiceImpl implements TestRunService {

    private final TestRunRepository testRunRepository;

    private final FeatureService featureService;

    public TestRunServiceImpl(final TestRunRepository testRunRepository, final FeatureService featureService) {
        this.testRunRepository = testRunRepository;
        this.featureService = featureService;
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
}
