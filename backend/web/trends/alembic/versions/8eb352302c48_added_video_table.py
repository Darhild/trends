"""Added video table

Revision ID: 8eb352302c48
Revises: d28292e0c4dd
Create Date: 2019-11-22 12:37:36.411884

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '8eb352302c48'
down_revision = 'd28292e0c4dd'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('video',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('category', sa.String(length=256), nullable=False),
                    sa.Column('data', sa.JSON(), nullable=True),
                    sa.Column('created_at',
                              sa.DateTime(timezone=True),
                              server_default=sa.text('clock_timestamp()'),
                              nullable=False),
                    sa.PrimaryKeyConstraint('id', name=op.f('pk__video'))
                    )


def downgrade():
    op.drop_table('video')

