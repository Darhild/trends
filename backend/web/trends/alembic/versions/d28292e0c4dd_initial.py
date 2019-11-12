"""Initial

Revision ID: d28292e0c4dd
Revises: 
Create Date: 2019-11-12 16:39:51.853229

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd28292e0c4dd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'content',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('category', sa.String(length=256), nullable=False),
        sa.Column('data', sa.JSON(), nullable=True),
        sa.Column(
            'created_at',
            sa.DateTime(timezone=True),
            server_default=sa.text('clock_timestamp()'),
            nullable=False
        ),
        sa.PrimaryKeyConstraint('id', name=op.f('pk__content'))
    )
    op.create_table(
        'trend',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('data', sa.JSON(), nullable=True),
        sa.Column(
            'created_at',
            sa.DateTime(timezone=True),
            server_default=sa.text('clock_timestamp()'),
            nullable=False
        ),
        sa.PrimaryKeyConstraint('id', name=op.f('pk__trend'))
    )


def downgrade():
    op.drop_table('trend')
    op.drop_table('content')
