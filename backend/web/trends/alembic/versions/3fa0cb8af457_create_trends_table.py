"""create trends table

Revision ID: 3fa0cb8af457
Revises: 
Create Date: 2019-11-06 16:13:42.875123

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '3fa0cb8af457'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'trends',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('data', sa.JSON(), nullable=False),
        sa.Column('source', sa.String(256), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False,
                  server_default=sa.text('clock_timestamp()')),
        sa.PrimaryKeyConstraint('id', name=op.f('pk__trends'))
    )


def downgrade():
    op.drop_table('trends')
