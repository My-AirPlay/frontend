'use client';
import { useState } from 'react';
import { Music, BarChart2, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetDashboardData } from './misc/api';
import { formatCurrency } from '@/utils/currency';
import { DSPBreakdownChart, RevenueHistoryChart, StreamsHistoryChart, TopCountriesTable, TopDSPsTable } from './misc/components';
import { Icon } from '@iconify/react/dist/iconify.js';

const MusicDashboard = () => {
	const data = {
		totalStreams: 31660,
		totalRevenue: 81.76575089999999,
		periodSummary: {
			'September 2023': {
				totalStreams: 31460,
				totalRevenue: 80.9349685
			},
			'July 2023': {
				totalStreams: 148,
				totalRevenue: 0.3958857
			},
			'June 2023': {
				totalStreams: 5,
				totalRevenue: 0.033159999999999995
			},
			'August 2023': {
				totalStreams: 39,
				totalRevenue: 0.37955269999999997
			},
			'May 2023': {
				totalStreams: 8,
				totalRevenue: 0.022184
			}
		},
		trackPerformance: [
			{
				trackTitle: 'Simple and Sweet Refix',
				totalStreams: 31660,
				totalRevenue: 81.76575089999999,
				periodBreakdown: {
					'September 2023': {
						streams: 31460,
						revenue: 80.9349685
					},
					'July 2023': {
						streams: 148,
						revenue: 0.3958857
					},
					'June 2023': {
						streams: 5,
						revenue: 0.033159999999999995
					},
					'August 2023': {
						streams: 39,
						revenue: 0.37955269999999997
					},
					'May 2023': {
						streams: 8,
						revenue: 0.022184
					}
				}
			}
		],
		dspBreakdown: {
			Spotify: {
				totalStreams: 3097,
				totalRevenue: 75.4326837,
				periodBreakdown: {
					'September 2023': {
						streams: 30197,
						revenue: 75.4326837
					}
				}
			},
			'Apple Music': {
				totalStreams: 946,
				totalRevenue: 3.7293000000000003,
				periodBreakdown: {
					'September 2023': {
						streams: 946,
						revenue: 3.7293000000000003
					}
				}
			},
			'YouTube Streaming': {
				totalStreams: 282,
				totalRevenue: 1.1349464,
				periodBreakdown: {
					'September 2023': {
						streams: 282,
						revenue: 1.1349464
					}
				}
			},
			'Amazon Music Unlimited': {
				totalStreams: 25,
				totalRevenue: 0.20667970000000002,
				periodBreakdown: {
					'September 2023': {
						streams: 25,
						revenue: 0.20667970000000002
					}
				}
			},
			'YouTube Content ID': {
				totalStreams: 8,
				totalRevenue: 0.0329627,
				periodBreakdown: {
					'September 2023': {
						streams: 8,
						revenue: 0.0329627
					}
				}
			},
			TIDAL: {
				totalStreams: 1,
				totalRevenue: 0.011396,
				periodBreakdown: {
					'September 2023': {
						streams: 1,
						revenue: 0.011396
					}
				}
			},
			iTunes: {
				totalStreams: 1,
				totalRevenue: 0.387,
				periodBreakdown: {
					'September 2023': {
						streams: 1,
						revenue: 0.387
					}
				}
			},
			Audiomack: {
				totalStreams: 70,
				totalRevenue: 0.0335517,
				periodBreakdown: {
					'July 2023': {
						streams: 70,
						revenue: 0.0335517
					}
				}
			},
			Deezer: {
				totalStreams: 66,
				totalRevenue: 0.310247,
				periodBreakdown: {
					'July 2023': {
						streams: 66,
						revenue: 0.310247
					}
				}
			},
			'Soundcloud Subscription': {
				totalStreams: 10,
				totalRevenue: 0.051503,
				periodBreakdown: {
					'July 2023': {
						streams: 10,
						revenue: 0.051503
					}
				}
			},
			'Soundcloud Ad Monetization': {
				totalStreams: 2,
				totalRevenue: 0.000584,
				periodBreakdown: {
					'July 2023': {
						streams: 2,
						revenue: 0.000584
					}
				}
			},
			Anghami: {
				totalStreams: 13,
				totalRevenue: 0.05534399999999999,
				periodBreakdown: {
					'June 2023': {
						streams: 5,
						revenue: 0.033159999999999995
					},
					'May 2023': {
						streams: 8,
						revenue: 0.022184
					}
				}
			},
			'Facebook / Instagram - Revenue Share': {
				totalStreams: 19,
				totalRevenue: 0.1808409,
				periodBreakdown: {
					'August 2023': {
						streams: 19,
						revenue: 0.1808409
					}
				}
			},
			'Facebook / Instagram': {
				totalStreams: 19,
				totalRevenue: 0.19671119999999997,
				periodBreakdown: {
					'August 2023': {
						streams: 19,
						revenue: 0.19671119999999997
					}
				}
			},
			'Pandora (Radio)': {
				totalStreams: 1,
				totalRevenue: 0.0020006,
				periodBreakdown: {
					'August 2023': {
						streams: 1,
						revenue: 0.0020006
					}
				}
			}
		},
		countryBreakdown: {
			USA: {
				totalStreams: 7662,
				totalRevenue: 18.644924900000003,
				periodBreakdown: {
					'September 2023': {
						streams: 7589,
						revenue: 18.5634435
					},
					'July 2023': {
						streams: 70,
						revenue: 0.0335517
					},
					'August 2023': {
						streams: 3,
						revenue: 0.0479297
					}
				}
			},
			GBR: {
				totalStreams: 3562,
				totalRevenue: 16.954218000000004,
				periodBreakdown: {
					'September 2023': {
						streams: 3559,
						revenue: 16.894138
					},
					'July 2023': {
						streams: 1,
						revenue: 0.027363
					},
					'August 2023': {
						streams: 2,
						revenue: 0.032716999999999996
					}
				}
			},
			NLD: {
				totalStreams: 1900,
				totalRevenue: 6.277354,
				periodBreakdown: {
					'September 2023': {
						streams: 1894,
						revenue: 6.233165
					},
					'July 2023': {
						streams: 2,
						revenue: 0.000584
					},
					'August 2023': {
						streams: 4,
						revenue: 0.043605
					}
				}
			},
			DEU: {
				totalStreams: 1896,
				totalRevenue: 4.971405,
				periodBreakdown: {
					'September 2023': {
						streams: 1889,
						revenue: 4.9111959999999995
					},
					'July 2023': {
						streams: 3,
						revenue: 0.010301
					},
					'August 2023': {
						streams: 4,
						revenue: 0.049907999999999994
					}
				}
			},
			CAN: {
				totalStreams: 1626,
				totalRevenue: 3.404634,
				periodBreakdown: {
					'September 2023': {
						streams: 1617,
						revenue: 3.380494
					},
					'July 2023': {
						streams: 9,
						revenue: 0.02414
					}
				}
			},
			SWE: {
				totalStreams: 1440,
				totalRevenue: 4.961710999999999,
				periodBreakdown: {
					'September 2023': {
						streams: 1438,
						revenue: 4.939563
					},
					'August 2023': {
						streams: 2,
						revenue: 0.022148
					}
				}
			},
			AUS: {
				totalStreams: 1431,
				totalRevenue: 3.611202,
				periodBreakdown: {
					'September 2023': {
						streams: 1431,
						revenue: 3.611202
					}
				}
			},
			PHL: {
				totalStreams: 1189,
				totalRevenue: 0.499999,
				periodBreakdown: {
					'September 2023': {
						streams: 1187,
						revenue: 0.493084
					},
					'August 2023': {
						streams: 2,
						revenue: 0.006914999999999999
					}
				}
			},
			NGA: {
				totalStreams: 1014,
				totalRevenue: 0.271202,
				periodBreakdown: {
					'September 2023': {
						streams: 1014,
						revenue: 0.271202
					}
				}
			},
			NOR: {
				totalStreams: 900,
				totalRevenue: 3.9062010000000003,
				periodBreakdown: {
					'September 2023': {
						streams: 900,
						revenue: 3.9062010000000003
					}
				}
			},
			FRA: {
				totalStreams: 863,
				totalRevenue: 2.5138510000000003,
				periodBreakdown: {
					'September 2023': {
						streams: 845,
						revenue: 2.399426
					},
					'July 2023': {
						streams: 16,
						revenue: 0.083276
					},
					'August 2023': {
						streams: 2,
						revenue: 0.031149
					}
				}
			},
			ZAF: {
				totalStreams: 634,
				totalRevenue: 0.615307,
				periodBreakdown: {
					'September 2023': {
						streams: 632,
						revenue: 0.610511
					},
					'July 2023': {
						streams: 2,
						revenue: 0.004796
					}
				}
			},
			DNK: {
				totalStreams: 518,
				totalRevenue: 2.200149,
				periodBreakdown: {
					'September 2023': {
						streams: 518,
						revenue: 2.200149
					}
				}
			},
			BRA: {
				totalStreams: 502,
				totalRevenue: 0.5729660000000001,
				periodBreakdown: {
					'September 2023': {
						streams: 483,
						revenue: 0.534734
					},
					'July 2023': {
						streams: 17,
						revenue: 0.019657
					},
					'August 2023': {
						streams: 2,
						revenue: 0.018575
					}
				}
			},
			IND: {
				totalStreams: 412,
				totalRevenue: 0.22338600000000003,
				periodBreakdown: {
					'September 2023': {
						streams: 410,
						revenue: 0.22198600000000002
					},
					'August 2023': {
						streams: 2,
						revenue: 0.0014000000000000002
					}
				}
			},
			CHE: {
				totalStreams: 396,
				totalRevenue: 1.634115,
				periodBreakdown: {
					'September 2023': {
						streams: 394,
						revenue: 1.600847
					},
					'August 2023': {
						streams: 2,
						revenue: 0.033268000000000006
					}
				}
			},
			NZL: {
				totalStreams: 385,
				totalRevenue: 1.1224770000000002,
				periodBreakdown: {
					'September 2023': {
						streams: 385,
						revenue: 1.1224770000000002
					}
				}
			},
			IDN: {
				totalStreams: 309,
				totalRevenue: 0.109793,
				periodBreakdown: {
					'September 2023': {
						streams: 309,
						revenue: 0.109793
					}
				}
			},
			ESP: {
				totalStreams: 301,
				totalRevenue: 0.5570849999999999,
				periodBreakdown: {
					'September 2023': {
						streams: 299,
						revenue: 0.524829
					},
					'August 2023': {
						streams: 2,
						revenue: 0.032256
					}
				}
			},
			IRL: {
				totalStreams: 296,
				totalRevenue: 1.188142,
				periodBreakdown: {
					'September 2023': {
						streams: 296,
						revenue: 1.188142
					}
				}
			},
			BEL: {
				totalStreams: 292,
				totalRevenue: 0.9324389999999999,
				periodBreakdown: {
					'September 2023': {
						streams: 290,
						revenue: 0.910252
					},
					'August 2023': {
						streams: 2,
						revenue: 0.022187
					}
				}
			},
			PRT: {
				totalStreams: 289,
				totalRevenue: 0.49129100000000003,
				periodBreakdown: {
					'September 2023': {
						streams: 289,
						revenue: 0.49129100000000003
					}
				}
			},
			ITA: {
				totalStreams: 271,
				totalRevenue: 0.601792,
				periodBreakdown: {
					'September 2023': {
						streams: 271,
						revenue: 0.601792
					}
				}
			},
			AUT: {
				totalStreams: 268,
				totalRevenue: 0.81074,
				periodBreakdown: {
					'September 2023': {
						streams: 268,
						revenue: 0.81074
					}
				}
			},
			POL: {
				totalStreams: 263,
				totalRevenue: 0.288419,
				periodBreakdown: {
					'September 2023': {
						streams: 263,
						revenue: 0.288419
					}
				}
			},
			MEX: {
				totalStreams: 238,
				totalRevenue: 0.23286800000000002,
				periodBreakdown: {
					'September 2023': {
						streams: 236,
						revenue: 0.21946900000000003
					},
					'August 2023': {
						streams: 2,
						revenue: 0.013399000000000001
					}
				}
			},
			ARE: {
				totalStreams: 177,
				totalRevenue: 0.48214599999999996,
				periodBreakdown: {
					'September 2023': {
						streams: 175,
						revenue: 0.475012
					},
					'August 2023': {
						streams: 2,
						revenue: 0.007134
					}
				}
			},
			SGP: {
				totalStreams: 143,
				totalRevenue: 0.22989300000000001,
				periodBreakdown: {
					'September 2023': {
						streams: 143,
						revenue: 0.22989300000000001
					}
				}
			},
			TUR: {
				totalStreams: 137,
				totalRevenue: 0.032183,
				periodBreakdown: {
					'September 2023': {
						streams: 137,
						revenue: 0.032183
					}
				}
			},
			COL: {
				totalStreams: 137,
				totalRevenue: 0.068275,
				periodBreakdown: {
					'September 2023': {
						streams: 134,
						revenue: 0.063891
					},
					'July 2023': {
						streams: 3,
						revenue: 0.004384
					}
				}
			},
			KEN: {
				totalStreams: 127,
				totalRevenue: 0.438981,
				periodBreakdown: {
					'September 2023': {
						streams: 125,
						revenue: 0.435778
					},
					'August 2023': {
						streams: 2,
						revenue: 0.003203
					}
				}
			},
			MYS: {
				totalStreams: 120,
				totalRevenue: 0.07894400000000001,
				periodBreakdown: {
					'September 2023': {
						streams: 120,
						revenue: 0.07894400000000001
					}
				}
			},
			CZE: {
				totalStreams: 100,
				totalRevenue: 0.13763,
				periodBreakdown: {
					'September 2023': {
						streams: 98,
						revenue: 0.129577
					},
					'August 2023': {
						streams: 2,
						revenue: 0.008053000000000001
					}
				}
			},
			ISR: {
				totalStreams: 100,
				totalRevenue: 0.240341,
				periodBreakdown: {
					'September 2023': {
						streams: 93,
						revenue: 0.205433
					},
					'July 2023': {
						streams: 7,
						revenue: 0.034908
					}
				}
			},
			SVK: {
				totalStreams: 86,
				totalRevenue: 0.143233,
				periodBreakdown: {
					'September 2023': {
						streams: 86,
						revenue: 0.143233
					}
				}
			},
			LUX: {
				totalStreams: 84,
				totalRevenue: 0.352439,
				periodBreakdown: {
					'September 2023': {
						streams: 84,
						revenue: 0.352439
					}
				}
			},
			EST: {
				totalStreams: 82,
				totalRevenue: 0.17835900000000002,
				periodBreakdown: {
					'September 2023': {
						streams: 82,
						revenue: 0.17835900000000002
					}
				}
			},
			FIN: {
				totalStreams: 74,
				totalRevenue: 0.258081,
				periodBreakdown: {
					'September 2023': {
						streams: 74,
						revenue: 0.258081
					}
				}
			},
			ROM: {
				totalStreams: 74,
				totalRevenue: 0.152161,
				periodBreakdown: {
					'September 2023': {
						streams: 74,
						revenue: 0.152161
					}
				}
			},
			ARG: {
				totalStreams: 70,
				totalRevenue: 0.023375,
				periodBreakdown: {
					'September 2023': {
						streams: 70,
						revenue: 0.023375
					}
				}
			},
			THA: {
				totalStreams: 64,
				totalRevenue: 0.031498,
				periodBreakdown: {
					'September 2023': {
						streams: 64,
						revenue: 0.031498
					}
				}
			},
			GRC: {
				totalStreams: 58,
				totalRevenue: 0.103173,
				periodBreakdown: {
					'September 2023': {
						streams: 58,
						revenue: 0.103173
					}
				}
			},
			UGA: {
				totalStreams: 58,
				totalRevenue: 0.040027,
				periodBreakdown: {
					'September 2023': {
						streams: 58,
						revenue: 0.040027
					}
				}
			},
			CHL: {
				totalStreams: 55,
				totalRevenue: 0.037555,
				periodBreakdown: {
					'September 2023': {
						streams: 55,
						revenue: 0.037555
					}
				}
			},
			GHA: {
				totalStreams: 55,
				totalRevenue: 0.025833000000000002,
				periodBreakdown: {
					'September 2023': {
						streams: 55,
						revenue: 0.025833000000000002
					}
				}
			},
			JPN: {
				totalStreams: 52,
				totalRevenue: 0.10642299999999999,
				periodBreakdown: {
					'September 2023': {
						streams: 52,
						revenue: 0.10642299999999999
					}
				}
			},
			ZMB: {
				totalStreams: 48,
				totalRevenue: 0.016725999999999998,
				periodBreakdown: {
					'September 2023': {
						streams: 48,
						revenue: 0.016725999999999998
					}
				}
			},
			HUN: {
				totalStreams: 47,
				totalRevenue: 0.057990999999999994,
				periodBreakdown: {
					'September 2023': {
						streams: 47,
						revenue: 0.057990999999999994
					}
				}
			},
			CRI: {
				totalStreams: 44,
				totalRevenue: 0.043793,
				periodBreakdown: {
					'September 2023': {
						streams: 44,
						revenue: 0.043793
					}
				}
			},
			SVN: {
				totalStreams: 43,
				totalRevenue: 0.05542,
				periodBreakdown: {
					'September 2023': {
						streams: 43,
						revenue: 0.05542
					}
				}
			},
			TWN: {
				totalStreams: 37,
				totalRevenue: 0.026807000000000004,
				periodBreakdown: {
					'September 2023': {
						streams: 37,
						revenue: 0.026807000000000004
					}
				}
			},
			HKG: {
				totalStreams: 36,
				totalRevenue: 0.07347400000000001,
				periodBreakdown: {
					'September 2023': {
						streams: 36,
						revenue: 0.07347400000000001
					}
				}
			},
			SAU: {
				totalStreams: 39,
				totalRevenue: 0.08092600000000001,
				periodBreakdown: {
					'September 2023': {
						streams: 36,
						revenue: 0.07424700000000001
					},
					'June 2023': {
						streams: 1,
						revenue: 0.000975
					},
					'May 2023': {
						streams: 2,
						revenue: 0.005704
					}
				}
			},
			PER: {
				totalStreams: 35,
				totalRevenue: 0.013925000000000002,
				periodBreakdown: {
					'September 2023': {
						streams: 35,
						revenue: 0.013925000000000002
					}
				}
			},
			MAR: {
				totalStreams: 33,
				totalRevenue: 0.019199,
				periodBreakdown: {
					'September 2023': {
						streams: 33,
						revenue: 0.019199
					}
				}
			},
			ETH: {
				totalStreams: 32,
				totalRevenue: 0.0017010000000000003,
				periodBreakdown: {
					'September 2023': {
						streams: 32,
						revenue: 0.0017010000000000003
					}
				}
			},
			ISL: {
				totalStreams: 28,
				totalRevenue: 0.111922,
				periodBreakdown: {
					'September 2023': {
						streams: 28,
						revenue: 0.111922
					}
				}
			},
			LKA: {
				totalStreams: 26,
				totalRevenue: 0.0019430000000000003,
				periodBreakdown: {
					'September 2023': {
						streams: 26,
						revenue: 0.0019430000000000003
					}
				}
			},
			EGY: {
				totalStreams: 30,
				totalRevenue: 0.016014,
				periodBreakdown: {
					'September 2023': {
						streams: 25,
						revenue: 0.009486999999999999
					},
					'June 2023': {
						streams: 1,
						revenue: 0.000604
					},
					'May 2023': {
						streams: 4,
						revenue: 0.0059229999999999994
					}
				}
			},
			VNM: {
				totalStreams: 23,
				totalRevenue: 0.0033030000000000004,
				periodBreakdown: {
					'September 2023': {
						streams: 23,
						revenue: 0.0033030000000000004
					}
				}
			},
			JOR: {
				totalStreams: 22,
				totalRevenue: 0.029011,
				periodBreakdown: {
					'September 2023': {
						streams: 22,
						revenue: 0.029011
					}
				}
			},
			ECU: {
				totalStreams: 20,
				totalRevenue: 0.012568,
				periodBreakdown: {
					'September 2023': {
						streams: 20,
						revenue: 0.012568
					}
				}
			},
			TZA: {
				totalStreams: 19,
				totalRevenue: 0.007566,
				periodBreakdown: {
					'September 2023': {
						streams: 19,
						revenue: 0.007566
					}
				}
			},
			MWI: {
				totalStreams: 19,
				totalRevenue: 0.016916999999999998,
				periodBreakdown: {
					'September 2023': {
						streams: 19,
						revenue: 0.016916999999999998
					}
				}
			},
			TTO: {
				totalStreams: 18,
				totalRevenue: 0.014419999999999999,
				periodBreakdown: {
					'September 2023': {
						streams: 18,
						revenue: 0.014419999999999999
					}
				}
			},
			KOR: {
				totalStreams: 16,
				totalRevenue: 0.039360000000000006,
				periodBreakdown: {
					'September 2023': {
						streams: 16,
						revenue: 0.039360000000000006
					}
				}
			},
			GTM: {
				totalStreams: 17,
				totalRevenue: 0.008969999999999999,
				periodBreakdown: {
					'September 2023': {
						streams: 15,
						revenue: 0.0032639999999999995
					},
					'August 2023': {
						streams: 2,
						revenue: 0.005706
					}
				}
			},
			LTU: {
				totalStreams: 15,
				totalRevenue: 0.033563,
				periodBreakdown: {
					'September 2023': {
						streams: 15,
						revenue: 0.033563
					}
				}
			},
			JAM: {
				totalStreams: 14,
				totalRevenue: 0.020516,
				periodBreakdown: {
					'September 2023': {
						streams: 14,
						revenue: 0.020516
					}
				}
			},
			QAT: {
				totalStreams: 13,
				totalRevenue: 0.012074,
				periodBreakdown: {
					'September 2023': {
						streams: 13,
						revenue: 0.012074
					}
				}
			},
			LVA: {
				totalStreams: 13,
				totalRevenue: 0.017447999999999998,
				periodBreakdown: {
					'September 2023': {
						streams: 13,
						revenue: 0.017447999999999998
					}
				}
			},
			CYP: {
				totalStreams: 12,
				totalRevenue: 0.012468,
				periodBreakdown: {
					'September 2023': {
						streams: 12,
						revenue: 0.012468
					}
				}
			},
			PAK: {
				totalStreams: 12,
				totalRevenue: -0.0021850000000000003,
				periodBreakdown: {
					'September 2023': {
						streams: 12,
						revenue: -0.0021850000000000003
					}
				}
			},
			NAM: {
				totalStreams: 12,
				totalRevenue: 0.001448,
				periodBreakdown: {
					'September 2023': {
						streams: 12,
						revenue: 0.001448
					}
				}
			},
			HRV: {
				totalStreams: 26,
				totalRevenue: 0.155758,
				periodBreakdown: {
					'September 2023': {
						streams: 10,
						revenue: 0.012198000000000002
					},
					'July 2023': {
						streams: 16,
						revenue: 0.14356
					}
				}
			},
			SLV: {
				totalStreams: 12,
				totalRevenue: 0.014113,
				periodBreakdown: {
					'September 2023': {
						streams: 10,
						revenue: 0.004748
					},
					'July 2023': {
						streams: 2,
						revenue: 0.009365
					}
				}
			},
			DZA: {
				totalStreams: 10,
				totalRevenue: 0.005546,
				periodBreakdown: {
					'September 2023': {
						streams: 10,
						revenue: 0.005546
					}
				}
			},
			SRB: {
				totalStreams: 9,
				totalRevenue: -0.0016330000000000008,
				periodBreakdown: {
					'September 2023': {
						streams: 9,
						revenue: -0.0016330000000000008
					}
				}
			},
			OMN: {
				totalStreams: 9,
				totalRevenue: 0.005057,
				periodBreakdown: {
					'September 2023': {
						streams: 9,
						revenue: 0.005057
					}
				}
			},
			BGR: {
				totalStreams: 9,
				totalRevenue: 0.011714,
				periodBreakdown: {
					'September 2023': {
						streams: 9,
						revenue: 0.011714
					}
				}
			},
			RWA: {
				totalStreams: 9,
				totalRevenue: 0.005338000000000001,
				periodBreakdown: {
					'September 2023': {
						streams: 9,
						revenue: 0.005338000000000001
					}
				}
			},
			MLT: {
				totalStreams: 7,
				totalRevenue: 0.010527000000000002,
				periodBreakdown: {
					'September 2023': {
						streams: 7,
						revenue: 0.010527000000000002
					}
				}
			},
			PAN: {
				totalStreams: 7,
				totalRevenue: 0.003497000000000001,
				periodBreakdown: {
					'September 2023': {
						streams: 7,
						revenue: 0.003497000000000001
					}
				}
			},
			BIH: {
				totalStreams: 7,
				totalRevenue: -0.0006390000000000002,
				periodBreakdown: {
					'September 2023': {
						streams: 7,
						revenue: -0.0006390000000000002
					}
				}
			},
			BOL: {
				totalStreams: 7,
				totalRevenue: 0.0013099999999999995,
				periodBreakdown: {
					'September 2023': {
						streams: 7,
						revenue: 0.0013099999999999995
					}
				}
			},
			GEO: {
				totalStreams: 7,
				totalRevenue: 0.010393,
				periodBreakdown: {
					'September 2023': {
						streams: 7,
						revenue: 0.010393
					}
				}
			},
			MUS: {
				totalStreams: 6,
				totalRevenue: -0.00013700000000000084,
				periodBreakdown: {
					'September 2023': {
						streams: 6,
						revenue: -0.00013700000000000084
					}
				}
			},
			UKR: {
				totalStreams: 6,
				totalRevenue: 0.004816999999999999,
				periodBreakdown: {
					'September 2023': {
						streams: 6,
						revenue: 0.004816999999999999
					}
				}
			},
			PRY: {
				totalStreams: 5,
				totalRevenue: -0.004478,
				periodBreakdown: {
					'September 2023': {
						streams: 5,
						revenue: -0.004478
					}
				}
			},
			ZWE: {
				totalStreams: 5,
				totalRevenue: 0.0019649999999999997,
				periodBreakdown: {
					'September 2023': {
						streams: 5,
						revenue: 0.0019649999999999997
					}
				}
			},
			AGO: {
				totalStreams: 4,
				totalRevenue: -0.0054670000000000005,
				periodBreakdown: {
					'September 2023': {
						streams: 4,
						revenue: -0.0054670000000000005
					}
				}
			},
			DOM: {
				totalStreams: 4,
				totalRevenue: 0.0006970000000000006,
				periodBreakdown: {
					'September 2023': {
						streams: 4,
						revenue: 0.0006970000000000006
					}
				}
			},
			BWA: {
				totalStreams: 4,
				totalRevenue: -0.001275,
				periodBreakdown: {
					'September 2023': {
						streams: 4,
						revenue: -0.001275
					}
				}
			},
			MAC: {
				totalStreams: 4,
				totalRevenue: 0.0013840000000000002,
				periodBreakdown: {
					'September 2023': {
						streams: 4,
						revenue: 0.0013840000000000002
					}
				}
			},
			CMR: {
				totalStreams: 4,
				totalRevenue: 0.004486,
				periodBreakdown: {
					'September 2023': {
						streams: 4,
						revenue: 0.004486
					}
				}
			},
			BHR: {
				totalStreams: 4,
				totalRevenue: 0.005086,
				periodBreakdown: {
					'September 2023': {
						streams: 4,
						revenue: 0.005086
					}
				}
			},
			NIC: {
				totalStreams: 3,
				totalRevenue: -0.0044080000000000005,
				periodBreakdown: {
					'September 2023': {
						streams: 3,
						revenue: -0.0044080000000000005
					}
				}
			},
			BGD: {
				totalStreams: 3,
				totalRevenue: -0.003224,
				periodBreakdown: {
					'September 2023': {
						streams: 3,
						revenue: -0.003224
					}
				}
			},
			MKD: {
				totalStreams: 3,
				totalRevenue: 0.0013059999999999999,
				periodBreakdown: {
					'September 2023': {
						streams: 3,
						revenue: 0.0013059999999999999
					}
				}
			},
			SYC: {
				totalStreams: 3,
				totalRevenue: 0.002953999999999999,
				periodBreakdown: {
					'September 2023': {
						streams: 3,
						revenue: 0.002953999999999999
					}
				}
			},
			MOZ: {
				totalStreams: 3,
				totalRevenue: -0.000029999999999999645,
				periodBreakdown: {
					'September 2023': {
						streams: 3,
						revenue: -0.000029999999999999645
					}
				}
			},
			URY: {
				totalStreams: 3,
				totalRevenue: 0.0007069999999999997,
				periodBreakdown: {
					'September 2023': {
						streams: 3,
						revenue: 0.0007069999999999997
					}
				}
			},
			BLZ: {
				totalStreams: 3,
				totalRevenue: -0.001947,
				periodBreakdown: {
					'September 2023': {
						streams: 3,
						revenue: -0.001947
					}
				}
			},
			GRD: {
				totalStreams: 3,
				totalRevenue: -0.001421,
				periodBreakdown: {
					'September 2023': {
						streams: 3,
						revenue: -0.001421
					}
				}
			},
			BEN: {
				totalStreams: 3,
				totalRevenue: -0.002474,
				periodBreakdown: {
					'September 2023': {
						streams: 3,
						revenue: -0.002474
					}
				}
			},
			KWT: {
				totalStreams: 2,
				totalRevenue: -0.004734,
				periodBreakdown: {
					'September 2023': {
						streams: 2,
						revenue: -0.004734
					}
				}
			},
			PNG: {
				totalStreams: 2,
				totalRevenue: 0.0006350000000000001,
				periodBreakdown: {
					'September 2023': {
						streams: 2,
						revenue: 0.0006350000000000001
					}
				}
			},
			BRB: {
				totalStreams: 2,
				totalRevenue: -0.00016299999999999995,
				periodBreakdown: {
					'September 2023': {
						streams: 2,
						revenue: -0.00016299999999999995
					}
				}
			},
			KAZ: {
				totalStreams: 2,
				totalRevenue: -0.0017009999999999998,
				periodBreakdown: {
					'September 2023': {
						streams: 2,
						revenue: -0.0017009999999999998
					}
				}
			},
			BDI: {
				totalStreams: 2,
				totalRevenue: 0.000471,
				periodBreakdown: {
					'September 2023': {
						streams: 2,
						revenue: 0.000471
					}
				}
			},
			KGZ: {
				totalStreams: 2,
				totalRevenue: 0.00079,
				periodBreakdown: {
					'September 2023': {
						streams: 2,
						revenue: 0.00079
					}
				}
			},
			LBN: {
				totalStreams: 3,
				totalRevenue: 0.0037920000000000002,
				periodBreakdown: {
					'September 2023': {
						streams: 2,
						revenue: 0.002817
					},
					'May 2023': {
						streams: 1,
						revenue: 0.000975
					}
				}
			},
			MDA: {
				totalStreams: 2,
				totalRevenue: 0.003472,
				periodBreakdown: {
					'September 2023': {
						streams: 2,
						revenue: 0.003472
					}
				}
			},
			FJI: {
				totalStreams: 2,
				totalRevenue: 0.00531,
				periodBreakdown: {
					'September 2023': {
						streams: 2,
						revenue: 0.00531
					}
				}
			},
			MCO: {
				totalStreams: 1,
				totalRevenue: -0.0016899999999999997,
				periodBreakdown: {
					'September 2023': {
						streams: 1,
						revenue: -0.0016899999999999997
					}
				}
			},
			BRN: {
				totalStreams: 1,
				totalRevenue: -0.0011520000000000002,
				periodBreakdown: {
					'September 2023': {
						streams: 1,
						revenue: -0.0011520000000000002
					}
				}
			},
			MNG: {
				totalStreams: 1,
				totalRevenue: -0.0014980000000000002,
				periodBreakdown: {
					'September 2023': {
						streams: 1,
						revenue: -0.0014980000000000002
					}
				}
			},
			MNE: {
				totalStreams: 1,
				totalRevenue: -0.0011650000000000002,
				periodBreakdown: {
					'September 2023': {
						streams: 1,
						revenue: -0.0011650000000000002
					}
				}
			},
			CIV: {
				totalStreams: 1,
				totalRevenue: -0.0024400000000000003,
				periodBreakdown: {
					'September 2023': {
						streams: 1,
						revenue: -0.0024400000000000003
					}
				}
			},
			COM: {
				totalStreams: 1,
				totalRevenue: -0.002944,
				periodBreakdown: {
					'September 2023': {
						streams: 1,
						revenue: -0.002944
					}
				}
			},
			HTI: {
				totalStreams: 1,
				totalRevenue: -0.002944,
				periodBreakdown: {
					'September 2023': {
						streams: 1,
						revenue: -0.002944
					}
				}
			},
			LSO: {
				totalStreams: 1,
				totalRevenue: -0.002944,
				periodBreakdown: {
					'September 2023': {
						streams: 1,
						revenue: -0.002944
					}
				}
			},
			NPL: {
				totalStreams: 1,
				totalRevenue: 0.000236,
				periodBreakdown: {
					'September 2023': {
						streams: 1,
						revenue: 0.000236
					}
				}
			},
			BHS: {
				totalStreams: 1,
				totalRevenue: 0.002324,
				periodBreakdown: {
					'September 2023': {
						streams: 1,
						revenue: 0.002324
					}
				}
			},
			COD: {
				totalStreams: 1,
				totalRevenue: 0.00283,
				periodBreakdown: {
					'September 2023': {
						streams: 1,
						revenue: 0.00283
					}
				}
			},
			MDV: {
				totalStreams: 1,
				totalRevenue: 0.003072,
				periodBreakdown: {
					'September 2023': {
						streams: 1,
						revenue: 0.003072
					}
				}
			},
			TUN: {
				totalStreams: 4,
				totalRevenue: 0.041163,
				periodBreakdown: {
					'June 2023': {
						streams: 3,
						revenue: 0.031581
					},
					'May 2023': {
						streams: 1,
						revenue: 0.009582
					}
				}
			}
		},
		deliveryBreakdown: {
			Streaming: {
				totalStreams: 31642,
				totalRevenue: 81.29538720000001,
				periodBreakdown: {
					'September 2023': {
						streams: 31451,
						revenue: 80.5150058
					},
					'July 2023': {
						streams: 148,
						revenue: 0.3958857
					},
					'June 2023': {
						streams: 2,
						revenue: 0.001579
					},
					'August 2023': {
						streams: 39,
						revenue: 0.37955269999999997
					},
					'May 2023': {
						streams: 2,
						revenue: 0.003364
					}
				}
			},
			UGC: {
				totalStreams: 8,
				totalRevenue: 0.0329627,
				periodBreakdown: {
					'September 2023': {
						streams: 8,
						revenue: 0.0329627
					}
				}
			},
			Download: {
				totalStreams: 10,
				totalRevenue: 0.437401,
				periodBreakdown: {
					'September 2023': {
						streams: 1,
						revenue: 0.387
					},
					'June 2023': {
						streams: 3,
						revenue: 0.031581
					},
					'May 2023': {
						streams: 6,
						revenue: 0.01882
					}
				}
			}
		},
		revenueHistory: [
			{
				period: 'August 2023',
				value: 0.37955269999999997
			},
			{
				period: 'July 2023',
				value: 0.3958857
			},
			{
				period: 'June 2023',
				value: 0.033159999999999995
			},
			{
				period: 'May 2023',
				value: 0.022184
			},
			{
				period: 'September 2023',
				value: 80.9349685
			}
		],
		streamsHistory: [
			{
				period: 'August 2023',
				value: 39
			},
			{
				period: 'July 2023',
				value: 148
			},
			{
				period: 'June 2023',
				value: 5
			},
			{
				period: 'May 2023',
				value: 8
			},
			{
				period: 'September 2023',
				value: 31460
			}
		],
		averageStreamValue: 0.002583,
		topTracks: [
			{
				trackTitle: 'Simple and Sweet Refix',
				totalStreams: 31660,
				totalRevenue: 81.76575089999999,
				periodBreakdown: {
					'September 2023': {
						streams: 31460,
						revenue: 80.9349685
					},
					'July 2023': {
						streams: 148,
						revenue: 0.3958857
					},
					'June 2023': {
						streams: 5,
						revenue: 0.033159999999999995
					},
					'August 2023': {
						streams: 39,
						revenue: 0.37955269999999997
					},
					'May 2023': {
						streams: 8,
						revenue: 0.022184
					}
				}
			}
		],
		topDSPs: [
			{
				name: 'Spotify',
				totalStreams: 30197,
				totalRevenue: 75.4326837
			},
			{
				name: 'Apple Music',
				totalStreams: 946,
				totalRevenue: 3.7293000000000003
			},
			{
				name: 'YouTube Streaming',
				totalStreams: 282,
				totalRevenue: 1.1349464
			},
			{
				name: 'Audiomack',
				totalStreams: 70,
				totalRevenue: 0.0335517
			},
			{
				name: 'Deezer',
				totalStreams: 66,
				totalRevenue: 0.310247
			}
		],
		topCountries: [
			{
				name: 'USA',
				totalStreams: 7662,
				totalRevenue: 18.644924900000003
			},
			{
				name: 'GBR',
				totalStreams: 3562,
				totalRevenue: 16.954218000000004
			},
			{
				name: 'NLD',
				totalStreams: 1900,
				totalRevenue: 6.277354
			},
			{
				name: 'DEU',
				totalStreams: 1896,
				totalRevenue: 4.971405
			},
			{
				name: 'CAN',
				totalStreams: 1626,
				totalRevenue: 3.404634
			},
			{
				name: 'SWE',
				totalStreams: 1440,
				totalRevenue: 4.961710999999999
			},
			{
				name: 'AUS',
				totalStreams: 1431,
				totalRevenue: 3.611202
			},
			{
				name: 'PHL',
				totalStreams: 1189,
				totalRevenue: 0.499999
			},
			{
				name: 'NGA',
				totalStreams: 1014,
				totalRevenue: 0.271202
			},
			{
				name: 'NOR',
				totalStreams: 900,
				totalRevenue: 3.9062010000000003
			}
		]
	};
	const { isLoading, error } = useGetDashboardData();
	const [currency, setCurrency] = useState('USD');

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center text-red-500 mt-10 p-6">
				<div className="mx-auto mb-4">⚠️</div>
				<h2 className="text-xl font-bold">Error loading dashboard data</h2>
				<p>Please try again later or contact support.</p>
			</div>
		);
	}

	// Prepare data for charts
	const revenueHistory = [...data?.revenueHistory]
		.sort((a, b) => {
			const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			const aMonth = a.period.split(' ')[0];
			const bMonth = b.period.split(' ')[0];
			const aYear = parseInt(a.period.split(' ')[1]);
			const bYear = parseInt(b.period.split(' ')[1]);
			if (aYear !== bYear) {
				return aYear - bYear;
			}
			return months.indexOf(aMonth) - months.indexOf(bMonth);
		})
		.map(entry => ({
			...entry,
			period: `${entry.period.split(' ')[0].slice(0, 3)} ${entry.period.split(' ')[1].slice(-2)}`
		}));

	const streamsHistory = [...data?.streamsHistory]
		?.sort((a, b) => {
			const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			const aMonth = a.period.split(' ')[0];
			const bMonth = b.period.split(' ')[0];
			const aYear = parseInt(a.period.split(' ')[1]);
			const bYear = parseInt(b.period.split(' ')[1]);
			if (aYear !== bYear) {
				return aYear - bYear;
			}
			return months.indexOf(aMonth) - months.indexOf(bMonth);
		})
		.map(entry => ({
			...entry,
			period: `${entry.period.split(' ')[0].slice(0, 3)} ${entry.period.split(' ')[1].slice(-2)}`
		}));
	// Prepare DSP data for pie chart
	const dspData = Object.entries(data?.dspBreakdown)
		.map(([name, details]) => ({
			name,
			value: details.totalStreams,
			revenue: details.totalRevenue
		}))
		.sort((a, b) => b.value - a.value)
		.slice(0, 5);

	return (
		<div className="container mx-auto px-4 py-6">
			<header className="mb-8">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
					<div>
						<h1 className="text-3xl font-bold">Dashboard</h1>
						<p className="text-muted-foreground">Track your music performance across platforms</p>
					</div>
					<div className="flex items-center space-x-4 mt-4 md:mt-0">
						<div className="relative">
							<select className="bg-background border rounded px-3 py-2 appearance-none pr-8" value={currency} onChange={e => setCurrency(e.target.value)}>
								<option value="USD">$ USD</option>
								<option value="EUR">€ EUR</option>
								<option value="GBP">£ GBP</option>
							</select>
							<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
								<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
									<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<Card>
					<CardHeader className="flex flex-row items-center gap-1.5 pb-2">
						<Music className="size-6 text-muted-foreground" />
						<CardTitle className="text-sm lg:text-xl font-semibold">Total Streams</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl lg:text-3xl font-bold">{data?.totalStreams.toLocaleString()}</div>
						<p className="text-xs text-muted-foreground">Avg. value: {formatCurrency(data?.averageStreamValue || 0)}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center gap-1.5 pb-2">
						<Icon icon="fa-solid:coins" height={30} width={30} className="text-white" />

						<CardTitle className="text-sm lg:text-xl font-semibold">Total Revenue</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl lg:text-3xl font-bold">{formatCurrency(data?.totalRevenue || 0)}</div>
						<p className="text-xs text-muted-foreground">Across all platforms</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center gap-1.5 pb-2">
						<BarChart2 className="size-6 text-muted-foreground" />
						<CardTitle className="text-sm lg:text-xl font-semibold">Top Platform</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl lg:text-3xl font-bold">{data?.topDSPs[0]?.name}</div>
						<p className="text-xs text-muted-foreground">{data?.topDSPs[0]?.totalStreams.toLocaleString()} streams</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center gap-1.5 pb-2">
						<Globe className="size-6 text-muted-foreground" />
						<CardTitle className="text-sm lg:text-xl font-semibold">Top Country</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl lg:text-3xl font-bold">{data?.topCountries[0]?.name}</div>
						<p className="text-xs text-muted-foreground">{data?.topCountries[0]?.totalStreams.toLocaleString()} streams</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				<Card className="col-span-1">
					<CardHeader>
						<CardTitle>Revenue History</CardTitle>
						<CardDescription>Monthly revenue breakdown</CardDescription>
					</CardHeader>
					<CardContent className="h-80">
						<RevenueHistoryChart data={revenueHistory} />
					</CardContent>
				</Card>

				<Card className="col-span-1">
					<CardHeader>
						<CardTitle>Streams History</CardTitle>
						<CardDescription>Monthly streams breakdown</CardDescription>
					</CardHeader>
					<CardContent className="h-80">
						<StreamsHistoryChart data={streamsHistory} />
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
				<DSPBreakdownChart data={dspData} />

				<Card className="col-span-1 lg:col-span-2">
					<CardHeader>
						<CardTitle>Track Performance</CardTitle>
						<CardDescription>{data?.trackPerformance[0]?.trackTitle}</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<h3 className="text-sm lg:text-xl font-semibold text-muted-foreground">Total Streams</h3>
									<p className="text-xl font-bold">{data?.trackPerformance[0]?.totalStreams.toLocaleString()}</p>
								</div>
								<div>
									<h3 className="text-sm lg:text-xl font-semibold text-muted-foreground">Total Revenue</h3>
									<p className="text-xl font-bold">{formatCurrency(data?.trackPerformance[0]?.totalRevenue || 0)}</p>
								</div>
							</div>

							<div>
								<h3 className="text-sm lg:text-xl font-semibold text-muted-foreground mb-2">Monthly Performance</h3>
								<div className="space-y-2">
									{Object.entries(data?.trackPerformance[0]?.periodBreakdown || {})
										.sort((a, b) => {
											const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
											const aMonth = a[0].split(' ')[0];
											const bMonth = b[0].split(' ')[0];
											return months.indexOf(bMonth) - months.indexOf(aMonth);
										})
										.map(([period, details]) => (
											<div key={period} className="flex justify-between items-center">
												<span className="text-sm">{period}</span>
												<div className="flex space-x-4">
													<span className="text-sm">{details.streams.toLocaleString()} streams</span>
													<span className="text-sm lg:text-xl font-semibold">{formatCurrency(details.revenue)}</span>
												</div>
											</div>
										))}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="platforms" className="mb-8">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="platforms">Platforms</TabsTrigger>
					<TabsTrigger value="countries">Countries</TabsTrigger>
				</TabsList>
				<TabsContent value="platforms">
					<Card>
						<CardHeader>
							<CardTitle>Platform Breakdown</CardTitle>
							<CardDescription>Performance across streaming platforms</CardDescription>
						</CardHeader>
						<CardContent>
							<TopDSPsTable dspData={data?.topDSPs} />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="countries">
					<Card>
						<CardHeader>
							<CardTitle>Country Breakdown</CardTitle>
							<CardDescription>Performance across countries</CardDescription>
						</CardHeader>
						<CardContent>
							<TopCountriesTable countryData={data?.topCountries} />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default MusicDashboard;
