from trends.models.merging import update_old
import pytest
import logging


@pytest.mark.parametrize(
    ('new_data', 'old_data', 'expected_result'), [
        ({}, {}, []),
        ({
             'movie': [{'id': 1, 'day': 1}, ]
         },
         {
             'movie': [{'id': 1, 'day': 0}, ]
         },
         [
             {
                 'category': 'movie',
                 'data': [
                     {'day': 1, 'id': 1}
                 ],
             }
         ],
        ),
        ({
             'movie': [{'id': 1, 'day': 0}, ]
         },
         {
             'movie': [{'id': 1, 'day': 1}, ]
         },
         [
             {
                 'category': 'movie',
                 'data': [
                     {'id': 1, 'day': 1}
                 ],
             }
         ],
        ),
        ({
             'movie': [{'id': 1, 'day': 10}, ]
         },
         {
             'movie': [{'id': 1, 'day': 1}, ]
         },
         [
             {
                 'category': 'movie',
                 'data': [
                     {'id': 1, 'day': 10}
                 ],
             }
         ],
        ),
        ({
             'movie': [{'id': 1, 'day': 10}, ]
         },
         {
             'movie': []
         },
         [
             {
                 'category': 'movie',
                 'data': [
                     {'id': 1, 'day': 10}
                 ],
             }
         ],
        ),
        ({
             'movie': [{'id': 2, 'day': 10}]
         },
         {
             'movie': [{'id': 1, 'day': 10}]
         },
         [
             {
                 'category': 'movie',
                 'data': [
                     {'id': 1, 'day': 10},
                     {'id': 2, 'day': 10}
                 ],
             }
         ],
        ),

        ({
             'movie': []
         },
         {
             'movie': [{'id': 1, 'day': 10}]
         },
         [
             {
                 'category': 'movie',
                 'data': [
                     {'id': 1, 'day': 10}
                 ],
             }
         ],
        ),

        ({
             'movie': [{'id': 2, 'day': 10}]
         },
         {
             'kids': [{'id': 1, 'day': 10}]
         },
         [
             {
                 'category': 'movie',
                 'data': [
                     {'id': 2, 'day': 10}
                 ],
             },
             {
                 'category': 'kids',
                 'data': [
                     {'id': 1, 'day': 10},
                 ],
             }
         ],
        ),
    ]
)
def test_merge_trends(new_data, old_data, expected_result):
    r = update_old(new_data, old_data)
    assert sorted(r, key=lambda x: x["category"]) == sorted(expected_result, key=lambda x: x["category"])
