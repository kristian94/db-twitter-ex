/**
 * Created by Kristian Nielsen on 12-02-2018.
 */
const mongo = require('../modules/mongo/mongo');
const _ = require('../modules/extensions/extensions');

module.exports = {
    async getUserCount(){
        return new Promise((resolve, reject) => {
            mongo((tweet, done) => {
                tweet.distinct('user', function(err, docs){
                    resolve(docs.length);
                    done();
                });
            })
        })
    },
    async getTenMostMentioning(){
        return new Promise((resolve, reject) => {
            mongo((tweet, done) => {
                tweet.aggregate([
                    // pipeline


                    // gruppering efter user, samt opsætning af mentionCount
                    {
                        $group: {
                            _id: { user: '$user'},
                            texts: {$push: '$text'}
                        }
                    }

                ], {
                    allowDiskUse: true
                }, function(err, results){
                    results.toArray().then(arr => {
                        const limit = 10;

                        const countMentions = (text) => {
                            return _.getMatches(text, /(\@[^\s]*)/g).length;
                        };
                        const countMentionsUser = (user) => {
                            user.numberOfMentions = user.texts.reduce((acc, current) => {
                                return acc + countMentions(current);
                            }, 0);
                            delete user.texts;
                            return user;
                        };
                        const arrWithMentionCount = arr.map(countMentionsUser);
                        const arrWithMentionCountSorted = arrWithMentionCount.sort((a, b) => {
                            return b.numberOfMentions - a.numberOfMentions;
                        });

                        const numberOfElements = Math.min(limit, arrWithMentionCountSorted.length);

                        arrWithMentionCountSortedLimited = arrWithMentionCountSorted.splice(0, numberOfElements);

                        resolve(arrWithMentionCountSortedLimited);
                        done();
                    })
                });
            })
        })
    },
    async getFiveMostMentioned(){
        return new Promise((resolve, reject) => {
            mongo((tweet, done) => {
                tweet.aggregate([
                    // pipeline

                    // gruppering efter user, samt opsætning af mentionCount
                    {
                        $group: {
                            _id: { user: '$user'},
                            texts: {$push: '$text'}
                        }
                    }
                ], {
                    allowDiskUse: true
                }, function(err, results){
                    results.toArray().then(arr => {
                        const mentionCounts = {}; // { user[string]: count[int] }
                        const res = [];

                        const sortRes = () => {
                            res.sort(function(a, b){
                                return b.numberOfMentions - a.numberOfMentions;
                            })
                        };

                        const pushAndSort = (obj => {
                            if(res.length == 5){
                                res[4] = obj;
                            }else{
                                res.push(obj)
                            }
                            sortRes();
                        });

                        const getMinValue = () => {
                            if(res[4]){
                                return res[4].numberOfMentions;
                            }else{
                                return 0;
                            }
                        };

                        arr.forEach(u => {
                            u.texts.forEach(t => {
                                _.getMatches(t, /(\@[^\s]*)/g).forEach(m => {
                                    const mention = m[1];
                                    const user = _.trimMention(mention)
                                    if(!user || user === '') return;
                                    if(mentionCounts[user] == undefined){
                                        mentionCounts[user] = 1
                                    }else{
                                        mentionCounts[user]++;
                                    }
                                })
                            })
                        });

                        _.objEach(mentionCounts, (key, value) => {
                            const min = getMinValue();
                            if(value > min){
                                pushAndSort({
                                    user: key,
                                    numberOfMentions: value
                                })
                            }
                        });

                        resolve(res);
                        done();
                    })
                });
            })
        })


    },
    async getTenMostActive(){
        return new Promise((resolve, reject) => {
            // group by user
            // count tweets per user (unique ids)
            // limit 10

            mongo((tweet, done) => {
                tweet.aggregate([
                    {
                        $group: {
                            _id: {user: '$user'},
                            "numberOfTweets": {$sum: 1}
                        }
                    },
                    {
                        $sort: {
                            numberOfTweets: -1
                        }
                    },
                    {
                        $limit: 5
                    }
                ], {
                    allowDiskUse: true
                }, function(err, results){
                    results.toArray().then(arr => {
                        resolve(arr)
                        done();
                    })
                })
            })
        })
    },
    async getFiveMostGrumpy(){
        // group tweets by user
        // map user to average polarity of their tweets
        // order by grumpiness
        // limit 5

        return new Promise((resolve, reject) => {
            mongo((tweet, done) => {
                tweet.aggregate([
                    {
                        $group: {
                            _id: {user: '$user'},
                            "averagePolarity": {$avg: '$polarity'}
                        }
                    },
                    {
                        $sort: {
                            averagePolarity: 1
                        }
                    },
                    {
                        $limit: 5
                    }
                ], {

                    allowDiskUse: true
                }, function(err, results){
                    results.toArray().then(arr => {
                        resolve(arr)
                        done();
                    })
                })
            })
        })

    }
};