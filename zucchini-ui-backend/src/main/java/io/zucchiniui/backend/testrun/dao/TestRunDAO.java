package io.zucchiniui.backend.testrun.dao;

import com.mongodb.BasicDBObject;
import io.zucchiniui.backend.campaign.views.Campaign;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaTypedQueryDAO;
import io.zucchiniui.backend.testrun.domain.TestRun;
import io.zucchiniui.backend.testrun.domain.TestRunQuery;
import xyz.morphia.Datastore;
import xyz.morphia.query.Query;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import static java.util.Arrays.asList;
import static java.util.stream.Collectors.toList;

@Component
public class TestRunDAO extends MorphiaTypedQueryDAO<TestRun, String, TestRunQuery> {

    public TestRunDAO(final Datastore ds) {
        super(ds);
    }

    @Override
    public Query<TestRun> prepareTypedQuery(final Consumer<? super TestRunQuery> preparator) {
        final TestRunQueryImpl typedQuery = new TestRunQueryImpl(createQuery());
        preparator.accept(typedQuery);
        return typedQuery.morphiaQuery();
    }

    public List<TestRun> findAllByCampaign(String campaign) {
        return this.createQuery().field("campaign").equal(campaign).asList();
    }

    /**
     * List all campaigns.
     *
     * @return a list of unique {@link Campaign}.
     */
    @SuppressWarnings("unchecked")
    public List<Campaign> listCampaigns() {
        // we want to exclude "" or null ..
        final BasicDBObject notInQuery = new BasicDBObject("campaign", new BasicDBObject("$nin", asList("", null)));
        return (List<Campaign>) this.getCollection().distinct("campaign", notInQuery)
            .stream()
            .map(campaign ->
                new Campaign(
                    campaign.toString(),
                    (int) this.createQuery().field("campaign").equal(campaign).count()
                )
            ).collect(toList());
    }

}
